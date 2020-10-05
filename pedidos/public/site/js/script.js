//TELAS DE CADASTRO E EDIÇÃO DE PEDIDO
//CÓDIGOS JAVASCRIPT, REQUESTS JQUERY :: LÓGICAS DE INSERÇÃO DE CLIENTE E PRODUTOS NA LISTA 

$(function() {
    //TOKEN LARAVEL
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //verifica se o modal foi aberto
    //realiza os resets dos valores anteriores
    $(document).on('show.bs.modal', '.modal', function () {
        $('.form-control').val('');
        $('#recipient-status').html('');
        $('#form-modal').show();
        $('#exampleModalLabel').show();
        $('#btn-modal-salvar').show();
        $('#btn-modal-cancelar').show();
    });

    //TRATAR OS DADOS DO MODAL NOVO CLIENTE
    $('#btn-modal-salvar').on('click', function (event) {
        var nome = $('#recipient-name').val();
        var telefone = $('#recipient-telefone').val();
        var endereco = $('#recipient-endereco').val();
        if(nome == "" || telefone == ""|| endereco == ""){
            $('#recipient-status').html("Os campos são obrigatórios");
        }else{
                       
            $.ajax({
                type: 'POST',
                url: '/clientes/novomodal',
                data: {
                    '_token': $('input[name=_token]').val(),
                    'nomecliente': nome,
                    'telefonecliente': telefone,
                    'enderecocliente': endereco,
                },
                success: function(data){
                    $('#btn-modal-salvar').hide();
                    $('#btn-modal-cancelar').hide();
                    $('#form-modal').hide();
                    $('#recipient-status').html(data);
                    $('.form-control').val('');
                    
                },
            });

        }
                
    });

    //VERIFICAR SE FOI SELECIONADO UM USUÁRIO ANTES DO SUBMIT
    $("#button_finalizar").click(function (event) {
        event.preventDefault();
        if($('#hidden_id').val() == ""){
            alert('Selecione um usuário! Campo obrigatório.');
        }else{
            $("#form_id").submit()
        };
    });


    //BUSCAR OS CLIENTES NO BANCO DE DADOS
    $("#buscar_cliente").click(function (event) {
        event.preventDefault();
        //se há um texto a ser pesquisado...
        if($('#cliente_search').val() != '')
        {
            //abre o modal para mostrar os resultados
            //prepara o layout para a nova função
            $('#exampleModal').modal('show');
            $('#form-modal').hide();
            $('#exampleModalLabel').hide();
            $('#btn-modal-salvar').hide();
            $('#recipient-status').html('pesquisando...');

            
            //REQUISIÇÃO JQUERY
            $.get("/pesquisa/clientes",{cliente:$('#cliente_search').val()}, function(data) {
                //SE RETORNOU ALUGUM REGISTRO...
                if(data.length != 0){
                    $('#recipient-status').html(data.length.toString() + ' Resultados');
                    //CRIE UMA TABELA COM OS DADOS DE CLIENTES
                    var html = "";
                    html += "<h4>Listagem de Clientes</h4>";
                    html += "<table class='table table-striped'>";
                    html += "<tr><th scope='col'>Nome</th><th scope='col'>Telefone</th><th scope='col' hidden>Endereço</th><th scope='col'>Escolher</th></tr>";
                    for(var i=0; i < data.length; i++)
                    {
                        
                        html += "<tr>";
                        html += "<td id='cli_nome" + data[i].id + "'>" + data[i].nome + "</td>";
                        html += "<td id='cli_telefone" + data[i].id + "'>" + data[i].telefone + "</td>";
                        html += "<td hidden id='cli_endereco" + data[i].id + "'>" + data[i].endereco + "</td>";
                        html += "<td><a class='btn btn-primary' id='selecionar' href='" + data[i].nome + "/" + data[i].id + "'>adicionar</a></td>";
                        html += "</tr>";
                    }
                    html += "</table>";
                    //apresenta os dados no modal da página
                    $('#form-modal').hide();
                    $('#btn-modal-salvar').hide();
                    $('#recipient-status').html(html);
                    $('#cliente_search').val('');
                }else{
                    //NENHUM CLIENTE ENCONTRADO
                    $('#recipient-status').html("Nenhum Cliente Encontrado");
                    $('#cliente_search').val('');

                } 
            })
        }
    });

    //CASO O USUÁRIO SELECIONE UM CLIENTE PARA SER DONO DO PEDIDO
    $(document).on('click','#selecionar', function () {
        
        event.preventDefault();
        var href = $(this).attr('href');
        var infos = href.split("/");
        //GUARDA O ID E MOSTRA O NOME DO CLIENTE Nas LABELS
        $("input[name='cliente_id']").val(infos[1]);
        $("#nomecliente").text(infos[0]);
        $('#telefonecliente').text($('#cli_telefone'+ infos[1]).text());
        $('#enderecocliente').text($('#cli_endereco'+ infos[1]).text());
        $("#status_clientes").html("");

    });

    //BUSCA POR PRODUTOS NO BANCO DE DADOS
    $("#buscar_produto").click(function (event) {
        event.preventDefault();
        //se há algum texto a ser pesquisado...
        if($('#produto_search').val() != '')
        {
            //abre o modal para mostrar os resultados
            $('#exampleModal').modal('show');
            $('#form-modal').hide();
            $('#btn-modal-salvar').hide();
            $("#recipient-status").html("pesquisando...");
            $('#exampleModalLabel').hide();
            
            //REQUISIÇÃO JQUERY
            $.get('/pesquisa/produtos',{produto:$('#produto_search').val()}, function(data) {
                //SE RETORNOU ALGUM REGISTRO...
                
                if(data.length != 0){
                    $("#recipient-status").html(data.length.toString() + ' Resultados');
                    
                    //CRIE UMA TABELA COM OS DADOS DE PRODUTOS                        
                    var html = "";
                    html += "<h4>Listagem de Produtos</h4>";
                    html += "<table class='table table-striped'>";
                    html += "<tr><th scope='col'>Nome</th><th scope='col'>Descrição</th><th scope='col'>Preço</th><th scope='col'>Escolher</th></tr>";
                    for(var i=0; i < data.length; i++)
                    {
                        
                        html += "<tr>";
                        html += "<td>" + data[i].nome + "</td>";
                        html += "<td>" + data[i].descricao + "</td>";
                        html += "<td>R$" + data[i].preco + "</td>";
                        html += "<td><a class='btn btn-primary' id='adicionar' href='" + data[i].id + "'>adicionar</span></a></td>";
                        html += "</tr>";
                    }
                    html += "</table>";
                    
                    //apresenta os dados no modal da página
                    $('#form-modal').hide();
                    $('#btn-modal-salvar').hide();
                    $('#produto_search').val('');
                    $('#recipient-status').html(html);
                }else{
                    //NENHUM PRODUTO ENCONTRADO
                    $('#recipient-status').html("Nenhum Produto Encontrado");
                    $('#produto_search').val('');

                }
                
                
            })
        }
        
    });
    
    //CASO O USUÁRIO ADICIONE UM NOVO PRODUTO NA LISTA
    $(document).on('click','#adicionar', function () {
        
        event.preventDefault();
        //pega o id selecionado
        var id = $(this).attr('href');
        //####verifica se produto adicionado já existe na lista de produtos###
        if($("input[name='id[]']").length){
            //recebe um array com os id de todos os campos input dos produtos já inseridos
            //pelo cliente
            var array_id = $("input[name='id[]']");
            
            for(var i=0; i < array_id.length; i++){
                //verifica se o id selecionado já existe no array de produtos já inseridos
                if(id == array_id[i].value){
                    alert("Produto já foi inserido!");
                    return;
                }
            }

        }
        //CASO O PRODUTO SELECIONADO AINDA NÃO TENHA SIDO INSERIDO
        var url = "/pesquisa/detalhes/" + id;
        //request jquery
        $.get(url, function(data) {

            if(data.length != 0){
                var produto = data[0].nome;
                var valor_unitario = data[0].preco;
                var id = data[0].id;
                //se ainda não tem cabeçalho na tabela, $('#header') - esse é o id do cabeçalho -  não existe!
                if(!$('#header').length){
                    
                    //insere o cabeçalho da tabela:: manipulação do DOM
                    $('#table_produtos').append("<tr id='header'>");
                    $('#table_produtos').append("<th hidden scope='col'>ID</th>");
                    $('#table_produtos').append("<th scope='col'>Nome</th>");
                    $('#table_produtos').append("<th scope='col'>Quantidade</th>");
                    $('#table_produtos').append("<th scope='col'>Preço Unitário</th>");
                    $('#table_produtos').append("<th scope='col'>Preço Total</th>");
                    $('#table_produtos').append("<th scope='col'>Remover</th>");
                    $('#table_produtos').append("</tr>");
                }
                
                //insere mais um produto na lista de produtos:: manipulação do DOM
                $('#table_produtos').append("<tr id='tr" + id + "'>");
                $('#table_produtos').append("<td hidden id='td" + id + "'><input type='text' name='id[]' value='"+ id +"'/></td>");
                $('#table_produtos').append("<td id='td" + id + "'>" + produto + "</td>");
                $('#table_produtos').append("<td id='td" + id + "'><input type='number' name='quantidade[]' id='" + id + "' value='1' min='1'/></td>");
                $('#table_produtos').append("<td id='td" + id + "'>R$<span id='valor_unitario" + id + "'>" + valor_unitario + '</span></td>');
                $('#table_produtos').append("<td id='td" + id + "'>R$<input readOnly type='text' id='valor_total" + id + "' value='"+ valor_unitario +"'/></td>");
                $('#table_produtos').append("<td id='td" + id + "'><a class='btn btn-danger' name='remove'id='" + id + "' href=''>remover</a></td>");
                $('#table_produtos').append("</tr>");

                //atualiza o valor total do pedido
                var valortotal = Number($('#total_pedido').val());
                valortotal += Number(valor_unitario);
                $('#total_pedido').val(valortotal.toFixed(2));
            }

        })
        $("#busca_produtos").empty();
        $("#status_produtos").html("");
        
    });
    //QUANDO O USUÁRIO ALTERA A QUANTIDADE DE ALGUM PRODUTO DA LISTA
    $(document).on('click',"input[name='quantidade[]']", function () {
        var quantidade = $(this).val();
        var id = $(this).attr('id');
        var inputvalortotal = "#valor_total" + id;
        var pvalorunitario = "#valor_unitario" + id;
        var valorunitario = $(pvalorunitario).text();
        //var valortotal :: valor total só de 1 produto
        var valortotal = quantidade * valorunitario;
        //var totalpedido ::  valor total do pedido
        var totalpedido = Number($('#total_pedido').val());
        totalpedido -= Number($(inputvalortotal).val());
        $(inputvalortotal).val(valortotal.toFixed(2));
        totalpedido += Number(valortotal);
        $('#total_pedido').val(totalpedido.toFixed(2));
    });

    //QUANDO O USUÁRIO REMOVE ALGUM PRODUTO DA LISTA
    $(document).on('click',"a[name='remove']", function () {
        event.preventDefault();
        var id = $(this).attr('id');
        var td_id = "#td" + id;
        //ATUALIZANDO O VALOR TOTAL DO PEDIDO
        //inputvalortotal :: id do campo valor total do produto removido
        var inputvalortotal = "#valor_total" + id;
        //var totalpedido ::  valor total do pedido
        var totalpedido = Number($('#total_pedido').val());
        totalpedido -= Number($(inputvalortotal).val());
        $('#total_pedido').val(totalpedido.toFixed(2));

        //REMOVE O PRODUTO DA LISTA
        $(td_id).parent().children(td_id).remove();

        
    });
        
});