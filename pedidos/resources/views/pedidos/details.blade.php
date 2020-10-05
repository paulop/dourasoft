@extends('principal')

@section('conteudo')
        <h1>Detalhes do Pedido</h1>
    
        <section class="pedido container">
            <div class="header row  mb-4 border-bottom d-flex justify-content-between">
                <div class="col-md-4"><h3>Pedido: {{$pedido->id}}<h3></div>
                <div class="col-md-4"><h3>Cliente: {{$cliente->nome}}<h3></div> 
                <div class="col-md-4 text-right">
                    <a class="btn btn-primary" href="/pedidos/editar/{{$pedido->id}}">
                        <b>editar</b></a>
                    <a class="btn btn-danger" href="/pedidos/excluir/{{$pedido->id}}">
                        <b>excluir</b></a>
                    <a class="btn btn-success" href="/pedidos/lista/">
                        <b>voltar</b></a>
                </div> 
                
               
            </div>
        @if(empty($produtos))
            <div class="alert alert-danger">
                Nenhum Produto no Pedido.
            </div>
        @else
            @foreach($produtos as $index => $produto)
            <div class="row d-flex justify-content-between text-center border-bottom align-items-center">
                <div>
                    <h4>Nome do Produto
                    <p>{{$produto->nome}}</p></h4>
                </div>
                <div>
                    <p>Descrição</p>
                    <p>{{$produto->descricao}}</p>
                </div>   
                <div>
                    <p>Valor unitário: R${{$produto->preco}}</p>
                    
                </div>    
                <div>
                    <p>Quantidade: {{$lista_produtos[$index]->quantidade}}</p>
                </div>    
                <div>
                    <p>Valor total: R${{ $lista_produtos[$index]->quantidade * $produto->preco }}</p>
                </div>    
                

            </div>
            @endforeach
        @endif
        </section>
        <div class="total text-right">
            <h3>Valor Total: R${{$pedido->total}}</h3>
        </div>
@stop    
