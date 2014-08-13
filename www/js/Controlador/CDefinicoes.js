/* 
 * CDefinicoes.js
 * Faz a gestão do fluxo de dados entre a Vista e o Modelo.
 */


function CDefinicoes(){
    
    // Update definicoes
    this.update = function(sistemaUnidades, vista){
        var definicoes = MDefinicoes.getDefinicoes();
        if ($.isEmptyObject(definicoes))
            definicoes = new MDefinicoes();
        definicoes.sistemaUnidades = sistemaUnidades;
        definicoes.vista = vista;
        definicoes.save();
    };
    
    // set Sistema Unidades  
    this.setSistemaUnidades = function(sistemaUnidades){
        var definicoes = MDefinicoes.getDefinicoes();
        if ($.isEmptyObject(definicoes))
            definicoes = new MDefinicoes();
        definicoes.sistemaUnidades = sistemaUnidades;
        definicoes.save();
    };
    
    // set Sistema Unidades  
    this.setVista = function(vista){
        var definicoes = MDefinicoes.getDefinicoes();
        if ($.isEmptyObject(definicoes))
            definicoes = new MDefinicoes();
        definicoes.vista = vista;
        definicoes.save();
    };
    
    this.getSistemaUnidades = function(){
      return MDefinicoes.getDefinicoes().sistemaUnidades;
    };
    
    this.getVista = function(){
      return MDefinicoes.getDefinicoes().vista;
    };
};
