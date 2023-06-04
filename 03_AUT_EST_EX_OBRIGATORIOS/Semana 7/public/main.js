
window.onload = function(){
    document.getElementById('btn').addEventListener('click', btn_click);

}

function btn_click() {
    document.getElementById('caixa').innerHTML = "Este é o texto aleaterado"

    ajax

    //criar objeto request

    let pedido = XMLHttpRequest();

    //criar pedido

    pedido.open("GET" , "dados.txt" , true);
    pedido.send();
    
    //definir funcao a qual vai atuar mediantea resposta do pedido
    pedido.onreadystatehange = function(){
        document.getElementById('caixa').innerHTML = this.responseText;
    }
}