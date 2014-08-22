/* 
 * MEstacao.js
 * Faz a gestão de todas as consultas/alterações relacionadas com as estações 
 * da aplicação à base de dados.
 */

function Localizacao(longitude, latitude){
    this.longitude = longitude;
    this.latitude = latitude;
}

function DataRegisto(ano, mes, dia, hora, minutos){
	this.ano = ano;
	this.mes = mes;
	this.dia = dia;
	this.hora = hora;
	this.minutos = minutos;
}

function Sensor(tipoSensor, listaDados) {
    this.tipoSensor = tipoSensor;
    this.listaDados = listaDados; //tuplos
}

function Registo(listaSensor, DataRegisto) {
    this.listaSensor = listaSensor;
    this.dataRegisto = DataRegisto;
}





function Estacao(id, tipoEstacao, nome, descricao, Localizacao, listaRegisto) {

    var _db = window.localStorage;
    var _tableName = 'estacoes';

    this.id = id;
    this.tipoEstacao = tipoEstacao;
    this.nome = nome;
    this.descricao = descricao;
    this.Localizacao = Localizacao;
    this.listaRegisto = listaRegisto;

    this.save = function() {
        var estacaoId = Estacao.getId(this.id);
        var estacoes = Estacao.getEstacoes();

        if (estacaoId === false)
            estacoes.push(this);
        else
            estacoes[estacaoId] = this;

        _db.setItem(_tableName, JSON.stringify(estacoes));
    };

    this.load = function() {
        return JSON.parse(_db.getItem(_tableName));
    };

}

Estacao.getEstacoes = function() {
    var estacoes = new Estacao().load();
    return (estacoes === null) ? [] : estacoes;
};

Estacao.getId = function(id) {
    var estacoes = Estacao.getEstacoes();
    for (var i = 0; i < estacoes.length; i++) {
        if (estacoes[i].id === id)
            return i;
    }
    return false;
};

Estacao.getTipoEstacao = function(id) {
    var estacao = Estacao.getEstacao(id);
    return (estacao === null) ? 0 : estacao.tipoEstacao;
};

Estacao.getNome = function(id) {
    var estacao = Estacao.getEstacao(id);
    return (estacao === null) ? 0 : estacao.nome;
};

Estacao.getDescricao = function(id) {
    var estacao = Estacao.getEstacao(id);
    return (estacao === null) ? 0 : estacao.descricao;
};

Estacao.getLocalizacao = function(id) {
    var estacao = Estacao.getEstacao(id);
    return (estacao === null) ? 0 : estacao.Localizacao;
};

Estacao.getListaRegisto = function(id) {
    var estacao = Estacao.getEstacao(id);
    return (estacao === null) ? 0 : estacao.listaRegisto;
};