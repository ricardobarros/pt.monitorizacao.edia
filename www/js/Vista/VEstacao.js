//VEstacao.js
//Faz as alterações à interface para mostar os dados da estação de monitorização. 


function preencheListaVEstacao(){
    
    var nomeDescricaoEstacoes = getNomeDescricaoCEstacao();

    var i;
    for (var i = 0; i < nomeDescricaoEstacoes.length; i++) {
        $('#ul_defaultEstacao').append('<li data-icon="false"><a href="#" class="estacoes activeEstacao">' + nomeDescricaoEstacoes[i][0] + '<br><span><small>' + nomeDescricaoEstacoes[i][1] + '</small></span></a></li>');
    }

    $('#ul_defaultEstacao').listview('refresh');
} 



