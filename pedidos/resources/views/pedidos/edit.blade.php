@extends('principal')

@section('conteudo')

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

    <h1>Editar Pedido</h1>    
    <h3>Cliente: <span id="nomecliente">{{$cliente->nome}}</span></h3>
    <h3>Telefone: <span id="telefonecliente">{{$cliente->telefone}}</span></h3>
    <h3>Endereço: <span id="enderecocliente">{{$cliente->endereco}}</span></h3>
    <br/>
        
    <form id="form_id" action="{{ route('update_pedido', ['pedido_id' => $pedido->id]) }}" method="POST">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" id="hidden_id" name="cliente_id" value="{{$cliente->id}}"/>
        <h3>Status do Pedido
        <select name="status">
        <option value="A" <?=($pedido->status == 'A')?'selected':''?>>Aberto</option>
        <option value="E" <?=($pedido->status == 'E')?'selected':''?>>Entregue</option>
        <option value="C" <?=($pedido->status == 'C')?'selected':''?>>Cancelado</option>
        </select></h3>
        <br/><br/>
        <h3>Adicionar Produto ao Pedido</h3>
        <div class="input-group-append float-right">
                <input type="text" class="img-thumbnail" id='produto_search' placeholder="Pesquisar Produto...">
                <a class="btn btn-primary" id="buscar_produto" href="">
                    <span class='glyphicon glyphicon-search'></span>
                </a>
        </div>
        <h3 class="border-top">Lista de Produtos</h3>

        <div class="lista-produtos" id="lista_de_produtos">    
            <table id="table_produtos" class="table table-striped">
                    
            @if(!empty($lista_produtos))

                @foreach($lista_produtos as $key => $value)
                    @if($key == 0)
                    <tr id='header'>
                        <th hidden>ID</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço Unitário</th>
                        <th>Preço Total</th>
                        <th>Remover</th>
                    </tr>
                    @endif
                    <tr id='tr{{$value->produto_id}}'>
                    <td hidden id='td{{$value->produto_id}}'><input type='text' name='id[]' value='{{$value->produto_id}}'/></td>
                    <td id='td{{$value->produto_id}}'>{{$produtos[$key]->nome}}</td>
                    <td id='td{{$value->produto_id}}'><input type='number' name='quantidade[]' id='{{$value->produto_id}}' value='{{$value->quantidade}}' min='1'/></td>
                    <td id='td{{$value->produto_id}}'>R$<span id='valor_unitario{{$value->produto_id}}'>{{$produtos[$key]->preco}}</span></td>
                    <td id='td{{$value->produto_id}}'>R$<input readOnly type='text' id='valor_total{{$value->produto_id}}' value='<?= $total = $value->quantidade * $produtos[$key]->preco?>'/></td>
                    <td id='td{{$value->produto_id}}'><a class="btn btn-danger" name='remove'id='{{$value->produto_id}}' href=''>remover</a></td>
                    </tr>   
                @endforeach
            @endif
            </table><br/><br/>
            <h3 class="border-bottom float-right">Valor Total do Pedido: R$<input type='text' name='total'id="total_pedido" value="{{$pedido->total}}"></h3>
        </div>
        <button id="button_finalizar" class="btn btn-lg btn-success mt-3">Atualizar Pedido</button><br/>
    </form>
    <form action="/pedidos/">
            <button id="button_cancelar" class="btn btn-lg btn-danger mt-3">Cancelar</button><br/>
    </form>
@stop
