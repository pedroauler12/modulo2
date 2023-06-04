

//função para trocar a cor do background
    $('#buttonColor').on("click", botaoCor);

    function botaoCor() {
        var corAtual = $('body').css("background-color");

        if (corAtual === 'rgb(255, 255, 255)' || corAtual === '#ffffff') {
            $('body').css("background-color", 'gray');
        } else {
            $('body').css("background-color", 'white');
        }
    }
//funcao para trocar informaçoes

$(document).ready(function(){
    dadosAtuais = $('.usuario');

    var dadosIniciais = {
        nome: "Pedro Auler",
        profissao: "engenheiro de software",
        mail: "exemplo@mail.com",
        telefone: "11-98765-4321"
    }
    
    var dadosAtuais = dadosIniciais;
    $('#buttonUser').click(function(event){
        event.preventDefault();


        if (dadosAtuais === dadosIniciais) {
            var dadosNovos = {
                nome: "user2",
                profissao: "cientista de dados",
                email: "user2@mail.com",
                telefone: "(11) 9999-6666"
            };

            $('.nome').text(dadosNovos.nome);
            $('.profissao').text(dadosNovos.profissao);
            $('.mail').text("mail: " + dadosNovos.email);
            $('.telefone').text("telefone: " + dadosNovos.telefone);

            $('.dados').hide(); // para esconder os elementos da classe dados
            $('.foto').hide();

            dadosAtuais = dadosNovos
        } else {

            $('.nome').text(dadosIniciais.nome);
            $('.profissao').text(dadosIniciais.profissao);
            $('.mail').text("mail: " + dadosIniciais.mail);
            $('.telefone').text("telefone: " + dadosIniciais.telefone);

            $('.dados').show() //mostra os elementos da classe dados
            $('.foto').show()
            dadosAtuais = dadosIniciais;
        }
        
    });
});
