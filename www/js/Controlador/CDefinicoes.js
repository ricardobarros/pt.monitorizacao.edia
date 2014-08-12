/* 
 * CDefinicoes.js
 * Faz a gestão do fluxo de dados entre a Vista e o Modelo.
 */


var CDefinicoes = function (){
    
    //obter o objecto do modelo
    this.model = new MDefinicoes();
    
    var definicoes = this.model.getDefinicoes;
    
    
    //definir as definições por defeito
    this.setDefaultDefinicoes = function(){
        
        if ($.isEmptyObject((definicoes))){
            definicoes = new MDefinicoes();
            definicoes.sistemaUnidades = "Internacional";
            definicoes.vista = "lista";
            definicoes.save();
        }
        console.log(definicoes.load());
    };
    
    
    //alterar sistema de unidades
    this.setSistemaUnidades = function(val){
        
        definicoes.sistemaUnidades = val;
        definicoes.save();
        
        console.log("getSistemaUnidades: ", definicoes.getSistemaUnidades());
        console.log(definicoes);
    };
    
    
    //alterar a vista
    this.setVista = function(val){
        
        definicoes.vista = val;
        definicoes.save();
        
        console.log(definicoes.getVista());
        console.log(definicoes);
    };
};



