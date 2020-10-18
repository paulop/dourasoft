$(function() {
    $(document).on('click','#btn-comprar', function () {
        event.preventDefault();
        $('#produtosModal').modal('show');
        var attrid = $(this).attr('href');
        var idprodutonome = '#produto' + attrid + 'nome';
        var idprodutopreco = '#produto' + attrid + 'preco';
        var nomeproduto = $(idprodutonome).html();
        var precoproduto = $(idprodutopreco).html();
        
        html = "";
        html += "<table class='table'>";
        html += "<tr>";
        html += "<th hidden scope='col'>ID</th>";
        html += "<th scope='col'>Produto</th>";
        html += "<th scope='col'>Preço Unitário</th>";
        html += "<th scope='col'>Quantidade</th>";
        html += "</tr>";
        html += "<tr>";
        html += "<td hidden id='modal-idproduto' scope='col'>" + attrid + "</td>";
        html += "<td id='modal-nomeproduto' scope='col'>" + nomeproduto + "</td>";
        html += "<td scope='col'>" + precoproduto + "</td>";
        html += "<td scope='col'><input id='modal-inputquantidade' type='number' name='quantidade' value='1' min='1'/></td>";
        html += "</tr>";

        $('#showproducts').html(html);


    });

    //TRATAR OS DADOS DO MODAL NOVO CLIENTE
    $('#modal-adicionarcarrinho').on('click', function (event) {
        /*
        $.get({
            url: 'produtos/ajax',
            success:function(data){
            alert(data);
            }
          });*/
        
        $.ajax({
            type: 'POST',
            url: '/produtos/ajax',
            //headers: {
            //    'X-CSRF-Token' : $("#_csrfToken").val(),
            //},
            cache: false,
            dataType: 'HTML',
            data: {
                'id': $('#modal-idproduto').html(),
                'quantidade': $('#modal-inputquantidade').val(),
            },
            beforeSend: function (xhr) { // Add this line
                xhr.setRequestHeader('X-CSRF-Token', $('input[name=_csrfToken]').val());
            },
            success: function(data){
                alert(data);
                //$('#btn-modal-salvar').hide();
                //$('#btn-modal-cancelar').hide();
                //$('#form-modal').hide();
                //$('#recipient-status').html(data);
                // $('.form-control').val('');
                
            },
        }); 
                
    });



/*
    $("#btn-comprar").click(function (event) {
        event.preventDefault();
        alert('Comprar');
    });
*/

});