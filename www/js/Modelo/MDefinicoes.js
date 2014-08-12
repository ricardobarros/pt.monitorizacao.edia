/* 
 * MDefinicoes.js
 * Faz a gestão de todas as consultas/alterações relacionadas com as definições 
 * da aplicação à base de dados.
 */


var MDefinicoes = function(){
    
    var _db = window.localStorage;
    var _nomeTabela = "definicoes";
    
    this.sistemaUnidades = "Internacional";
    this.vista = "Estacao";
    
    
    this.load = function(){
      return JSON.parse(_db.getItem(_nomeTabela));  
    };
    
    this.save = function (){
        _db.setItem(_nomeTabela, JSON.stringify(this));
    };
    
    

    
    
};






