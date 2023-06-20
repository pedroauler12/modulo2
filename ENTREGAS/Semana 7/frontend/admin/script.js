const api = 'http://127.0.0.1:3000';

$(document).ready(() => {
    users.list();
    formacoes.list();
    experiencias.list();
    realizacoes.list();
    console.log('teste');
});

var users = {
    list() {
        $.ajax({
            url: api + '/users',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir usuário</div>';
                data.forEach(element => {
                    tx += '<div class="user">';
                    tx += '<div class="title">' + `${element.nome_completo} - ${element.email} - ${element.telefone}` + '</div>';
                    tx += '<div class="actions">';
                    tx += '<div class="action" onclick="user.update(' + element.userId + ',\'' + element.nome_completo + '\')">Editar</div>';
                    tx += '<div class="action" onclick="user.delete(' + element.userId + ')">Excluir</div>';
                    tx += '</div>';
                    tx += '</div>';
                });
                $('#users').html(tx);
            }
        });
    }
};

var user = {
    insert() {
        var nome_completo = prompt('Digite o nome:');
        var email = prompt('Digite o email:');
        var telefone = prompt('Digite o telefone:');
        console.log(`${nome_completo} - ${email} - ${telefone}`);
        if (nome_completo && email && telefone) {
            if (nome_completo.trim() !== '' && email.trim() !== '' && telefone.trim() !== '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userinsert',
                    data: { nome_completo: nome_completo, email: email, telefone: telefone },
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },

    update(userId, oldTitle) {
        var nome_completo = prompt('Digite o novo nome completo:', oldTitle);
        if (nome_completo) {
            if (nome_completo.trim() !== '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userupdate',
                    data: { nome_completo: nome_completo, userId: userId },
                }).done(function () {
                    users.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },

    delete(userId) {
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/userdelete',
                data: { userId: userId },
            }).done(function () {
                users.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
            console.log(userId);
        }
    },
};

var formacoes = {
    list() {
        console.log('teste2');
        $.ajax({
            url: api + '/formacoes',
            type: 'GET',
            success: data => {
                var tx2 = '';
                tx2 += '<div class="insert" onclick="formacao.insert()">Inserir formação</div>';

                data.forEach(element => {
                    tx2 += '<div class="formacao">';
                    tx2 += '<div class="title">' + `${element.instituicao} - ${element.curso} - ${element.data_inicio} - ${element.data_fim}` + '</div>';
                    tx2 += '<div class="actions">';
                    tx2 += '<div class="action" onclick="formacao.update(' + element.id_formacao + ',\'' + element.instituicao + '\', \'' + element.curso + '\', \'' + element.data_inicio + '\', \'' + element.data_fim + '\')">Editar formação</div>';
                    tx2 += '<div class="action" onclick="formacao.delete(' + element.id_formacao + ')">Excluir formação</div>';
                    tx2 += '</div>';
                    tx2 += '</div>';
                });

                $('#formacoes').html(tx2);
                console.log(tx2);
            }
        });
    }
};

var formacao = {
    insert() {
        var instituicao = prompt('Digite sua instituição');
        var curso = prompt('Digite seu curso');
        var data_inicio = prompt('Digite a data de inicio');
        var data_fim = prompt('Digite a data de finalização');
        console.log(`${instituicao} - ${curso} - ${data_inicio} - ${data_fim}`);
        if (instituicao && curso && data_inicio && data_fim) {
            if (instituicao.trim() !== '' && curso.trim() !== '' && data_inicio.trim() !== '' && data_fim.trim() !== '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/inserirFormacao',
                    data: { instituicao: instituicao, curso: curso, data_inicio: data_inicio, data_fim: data_fim },
                }).done(function () {
                    formacoes.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },

    update(id_formacao, oldTitle) {
        var instituicao = prompt('Digite a nova instituição:', oldTitle);
        var curso = prompt('Digite o novo curso:', oldTitle);
        var data_inicio = prompt('Digite a nova data de início:', oldTitle);
        var data_fim = prompt('Digite a nova data de finalização:', oldTitle);
        if (instituicao.trim() !== '' && curso.trim() !== '' && data_inicio.trim() !== '' && data_fim.trim() !== '') {
            $.ajax({
                type: 'POST',
                url: api + '/atualizarFormacao',
                data: { id_formacao: id_formacao, instituicao: instituicao, curso: curso, data_inicio: data_inicio, data_fim: data_fim },
            }).done(function () {
                formacoes.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },

    delete(id_formacao) {
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/deletaFormacao',
                data: { id_formacao: id_formacao },
            }).done(function () {
                formacoes.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
            console.log(id_formacao);
        }
    }
};

var experiencias = {
    list() {
        console.log('teste2');
        $.ajax({
            url: api + '/experiencias',
            type: 'GET',
            success: data => {
                var tx3 = '';
                tx3 += '<div class="insert" onclick="experiencia.insert()">Inserir experiência</div>';

                data.forEach(element => {
                    tx3 += '<div class="experiencia">';
                    tx3 += '<div class="title">' + `${element.empresa} - ${element.cargo} - ${element.data_inicio} - ${element.data_fim}` + '</div>';
                    tx3 += '<div class="actions">';
                    tx3 += '<div class="action" onclick="experiencia.update(' + element.id_experiencia + ',\'' + element.empresa + '\', \'' + element.cargo + '\', \'' + element.data_inicio + '\', \'' + element.data_fim + '\')">Editar experiência</div>';
                    tx3 += '<div class="action" onclick="experiencia.delete(' + element.id_experiencia + ')">Excluir experiência</div>';
                    tx3 += '</div>';
                    tx3 += '</div>';
                });

                $('#experiencias').html(tx3);
                console.log(tx3);
            }
        });
    }
};

var experiencia = {
    insert() {
        var empresa = prompt('Digite sua empresa');
        var cargo = prompt('Digite seu cargo');
        var data_inicio = prompt('Digite a data de inicio');
        var data_fim = prompt('Digite a data de finalização');
        console.log(`${empresa} - ${cargo} - ${data_inicio} - ${data_fim}`);
        if (empresa && cargo && data_inicio && data_fim) {
            if (empresa.trim() !== '' && cargo.trim() !== '' && data_inicio.trim() !== '' && data_fim.trim() !== '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/inserirExperiencia',
                    data: { empresa: empresa, cargo: cargo, data_inicio: data_inicio, data_fim: data_fim },
                }).done(function () {
                    experiencias.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
    update(id_experiencia, oldTitle) {
        var empresa = prompt('Digite a nova empresa:', oldTitle);
        var cargo = prompt('Digite o novo cargo:', oldTitle);
        var data_inicio = prompt('Digite a nova data de início:', oldTitle);
        var data_fim = prompt('Digite a nova data de finalização:', oldTitle);
        if (empresa.trim() !== '' && cargo.trim() !== '' && data_inicio.trim() !== '' && data_fim.trim() !== '') {
            $.ajax({
                type: 'POST',
                url: api + '/atualizarExperiencia',
                data: { id_experiencia: id_experiencia, empresa: empresa, cargo: cargo, data_inicio: data_inicio, data_fim: data_fim },
            }).done(function () {
                experiencias.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },

    delete(id_experiencia) {
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/deletaExperiencia',
                data: { id_experiencia: id_experiencia },
            }).done(function () {
                experiencias.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
            console.log(id_experiencia);
        }
    }
};

//realizações

var realizacoes = {
    list() {
        $.ajax({
            url: api + '/realizacoes',
            type: 'GET',
            success: data => {
                var tx2 = '';
                tx2 += '<div class="insert" onclick="realizacao.insert()">Inserir realização</div>';

                data.forEach(element => {
                    tx2 += '<div class="realizacao">';
                    tx2 += '<div class="title">' + `${element.titulo} - ${element.descricao}` + '</div>';
                    tx2 += '<div class="actions">';
                    tx2 += '<div class="action" onclick="realizacao.update(' + element.id_realizacao + ',\'' + element.titulo + '\', \'' + element.descricao + '\')">Editar realização</div>';
                    tx2 += '<div class="action" onclick="realizacao.delete(' + element.id_realizacao + ')">Excluir realização</div>';
                    tx2 += '</div>';
                    tx2 += '</div>';
                });
                $('#realizacoes').html(tx2);
            }
        });
    }

};

var realizacao = {
    insert() {
        var titulo = prompt('Digite o titulo');
        var descricao = prompt('Digite a descrição');
        console.log(`${titulo} - ${descricao}`);
        if (titulo && descricao) {
            if (titulo.trim() !== '' && descricao.trim() !== '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/inserirRealizacao',
                    data: { titulo: titulo, descricao: descricao },
                }).done(function () {
                    realizacoes.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },
    
    update(id_realizacao, oldTitle) {
        var titulo = prompt('Digite o novo titulo:', oldTitle);
        var descricao = prompt('Digite a nova descrição:', oldTitle);
        if (titulo.trim() !== '' && descricao.trim() !== '') {
            $.ajax({
                type: 'POST',
                url: api + '/atualizarRealizacao',
                data: { id_realizacao: id_realizacao, titulo: titulo, descricao: descricao },
            }).done(function () {
                realizacoes.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },

    delete(id_realizacao) {
        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/deletaRealizacao',
                data: { id_realizacao: id_realizacao },
            }).done(function () {
                realizacoes.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
            console.log(id_realizacao);
        }
    }
};