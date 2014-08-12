/*
 * CPrincipal.js
 */

$(document).ready(function() {
    
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    onDeviceReady();
});


function onDeviceReady() {
    
    var _CDefinicoes = new CDefinicoes();
    _CDefinicoes.setDefaultDefinicoes();
    
    _CDefinicoes.setSistemaUnidades("Imperial");
    _CDefinicoes.setVista("Estação");
    //verificarRequisitos()
    
    //preencherListaEstacoes() 
    

}

function verificarRequisitos(){
    // verificar local storage
}

function preencherListaEstacoes(){
    //preencher "listaEstacoes" com as estações disponíveis
    
    
}