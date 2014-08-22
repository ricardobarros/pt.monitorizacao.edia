function getIdentificacaoEstacao(elementosEstacaoX){
    var $id = $(elementosEstacaoX).find('id').text();
    var $tipoEstacao = $(elementosEstacaoX).find('tipoEstacao').text();
    var $nome = $(elementosEstacaoX).find('nome').text();
    var $descricao = $(elementosEstacaoX).find('descricao').text();

    var $latitude = $(elementosEstacaoX).find('localizacao').attr("latitude");
    var $longitude = $(elementosEstacaoX).find('localizacao').attr("longitude");
    var $localizacao = new Localizacao($longitude, $latitude);
    
    return [$id, $tipoEstacao, $nome, $descricao, $localizacao];
}

function getDataRegisto(elementosRegistoX){

    var $dataAttributes = $(elementosRegistoX).find('data');
    var $ano = $dataAttributes.attr("ano");
    var $mes = $dataAttributes.attr("mes");
    var $dia = $dataAttributes.attr("dia");
    var $hora = $dataAttributes.attr("hora");
    var $minutos = $dataAttributes.attr("minutos");
    var $dataRegisto = new DataRegisto($ano, $mes, $dia, $hora, $minutos);
   
    return new DataRegisto($ano, $mes, $dia, $hora, $minutos);
}


/*
 * Obter os dados das ESTAÇÕES na WEB.
 */
function atualizaEstacoes(){

    $.get('https://dl.dropboxusercontent.com/u/3449056/edia3.xml',
        null,
        function(data) {
            var estacoes = [];
            var infoEstacao = [];

            var $estacoesElements = $(data).find('estacao');

            var estacao_i;
            for (estacao_i = 0; estacao_i < $estacoesElements.length; estacao_i++) {

                infoEstacao = getIdentificacaoEstacao($estacoesElements[estacao_i]);

                var $registoElements = $($estacoesElements[estacao_i]).find("registo");

                var listaRegisto = [];
                var registo_i;
                for (registo_i = 0; registo_i < $registoElements.length; registo_i++) {

                    var $dataRegisto = getDataRegisto($registoElements[registo_i]);

                    var $sensorElements = $($registoElements[registo_i]).find('sensor');

                    var listaSensor = [];
                    var sensor_i, new_sensor;
                    for (sensor_i = 0; sensor_i < $sensorElements.length; sensor_i++) {

                        var $tipoSensor = $($sensorElements[sensor_i]).attr('tipoSensor');

                        switch (infoEstacao[1]) {

                            case "hidrografica":
                                var $atual = $($sensorElements[sensor_i]).attr('atual');
                                new_sensor = new Sensor($tipoSensor, {atual: $atual});
                                break;//case "hidrografica":

                            case "meterologica":
                                switch ($tipoSensor) {
                                    case "percipitacao":
                                        var $atual = $($sensorElements[sensor_i]).attr('atual');
                                        var $acumulada = $($sensorElements[sensor_i]).attr('acumulada');
                                        new_sensor = new Sensor($tipoSensor, {atual: $atual, acumulada: $acumulada});
                                        break;
                                    case "temperatura_ar":
                                        var $atual = $($sensorElements[sensor_i]).attr('atual');
                                        var $min = $($sensorElements[sensor_i]).attr('min');
                                        var $max = $($sensorElements[sensor_i]).attr('max');
                                        new_sensor = new Sensor($tipoSensor, {atual: $atual, min: $min, max: $max});
                                        break;
                                    case "humidade_relativa":
                                        var $atual = $($sensorElements[sensor_i]).attr('atual');
                                        var $min = $($sensorElements[sensor_i]).attr('min');
                                        var $max = $($sensorElements[sensor_i]).attr('max');
                                        new_sensor = new Sensor($tipoSensor, {atual: $atual, min: $min, max: $max});
                                        break;
                                    case "vento":
                                        var $velocidade_atual = $($sensorElements[sensor_i]).attr('velocidade_atual');
                                        var $velocidade_media = $($sensorElements[sensor_i]).attr('velocidade_media');
                                        var $direcao_atual = $($sensorElements[sensor_i]).attr('direcao_atual');
                                        var $direcao_predominante = $($sensorElements[sensor_i]).attr('direcao_predominante');
                                        new_sensor = new Sensor($tipoSensor, {velocidade_atual: $velocidade_atual,
                                            velocidade_media: $velocidade_media,
                                            direcao_atual: $direcao_atual,
                                            direcao_predominante: $direcao_predominante});
                                        break;
                                }
                                break;//end case "meterologica":

                        }//end switch ($tipoEstacao)

                        //criar a lista de sensores com os dados
                        listaSensor.push(new_sensor);
                    }//end for sensores

                    //criar a lista de registos (dados do sensor e data)
                    listaRegisto.push(new Registo(listaSensor, $dataRegisto));
                }//end for registos
                estacoes.push(new Estacao(
                        infoEstacao[0],
                        infoEstacao[1],
                        infoEstacao[2],
                        infoEstacao[3],
                        infoEstacao[4],
                        listaRegisto));
            }//end for estações

            // Gravar os dados
            var estacao_i;
            for (estacao_i = 0; estacao_i < estacoes.length; estacao_i++)
                estacoes[estacao_i].save();
        }
    );

}


function getNomeDescricaoCEstacao(){
    
    var estacoes = Estacao.getEstacoes();
    var nome_descricao = [];
    
    //{a: $velocidade_atual,b: $velocidade_media}
    for (var i = 0; i < estacoes.length; i++) {
        nome_descricao.push([estacoes[i].nome, estacoes[i].descricao]);
    }
    return nome_descricao;
}