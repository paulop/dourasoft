@extends('principal')

@section('conteudo')
        <h1>Novo Pedido</h1>
        <!--Modal para criação de novo usuário -->    
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Cadastrar Novo Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="recipient-status"></div>
                <form id='form-modal'>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Nome:</label>
                        <input type="text" class="form-control" id="recipient-name">
                    </div>
                    <div class="form-group">
                        <label for="recipient-telefone" class="col-form-label">Telefone:</label>
                        <input type="text" class="form-control" id="recipient-telefone">
                    </div>
                    <div class="form-group">
                        <label for="recipient-endereco" class="col-form-label">Endereço:</label>
                        <input type="text" class="form-control" id="recipient-endereco">
                    </div>
                </form>
                <button type="button" id="btn-modal-salvar" class="btn btn-primary">Salvar</button>
                <button type="button" id='btn-modal-cancelar' class="btn btn-danger" data-dismiss="modal">Cancelar</button>

               
            </div>
            <div class="modal-footer">
            </div>
            </div>
        </div>
        </div>

            <div>
                <div class="input-group-append mb-5">
                    <input type="text" class="img-thumbnail" id="cliente_search" placeholder="Pesquisar Cliente...">
                    <a class="btn btn-primary" id="buscar_cliente" href="">
                        <span class='glyphicon glyphicon-search'></span>
                    </a>
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Novo Cliente</button>
                </div>

                <h3>Cliente: <span id="nomecliente"></span></h3>
                <h3>Telefone: <span id="telefonecliente"></span></h3>
                <h3>Endereço: <span id="enderecocliente"></span></h3>
                <br/>
            </div>

        <form id="form_id" action="{{ route('criar_novo_pedido') }}" method="POST">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" id="hidden_id" name="cliente_id" value=""/>
            <h3>Status do Pedido
            <select name="status">
            <option value="A">Aberto</option>
            <option value="E">Entregue</option>
            <option value="C">Cancelado</option>
            </select></h3>
            <br/><br/>
            <div class="row d-flex justify-content-around">

            </div>
            <div class="">
                
                <div class=''>
                    <h3>Adicionar Produto ao Pedido</h3>
                    <div class="input-group-append float-right">
                        <input type="text" class="img-thumbnail" id='produto_search' placeholder="Pesquisar Produto...">
                        <a class="btn btn-primary" id="buscar_produto" href="">
                            <span class='glyphicon glyphicon-search'></span>
                        </a>
                    </div> 
                </div>
                <div class="">
                    <h3 class="border-top">Lista de Produtos</h3>
                </div>
            </div>
            <div class="lista-produtos" id="lista_de_produtos">
                
                <table id="table_produtos" class="table table-striped">
                                
                </table><br/><br/>
                <h3 class="border-bottom float-right">Valor Total do Pedido: R$<input type='text' name='total'id="total_pedido" value="0.00"></h3>                
            </div>
            <button id="button_finalizar" class="btn btn-lg btn-success mt-3">Finalizar o Pedido</button><br/>
        </form>
        <form action="/pedidos/">
            <button id="button_cancelar" class="btn btn-lg btn-danger mt-3">Cancelar</button><br/>
        </form>
@stop
