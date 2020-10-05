@extends('principal')

@section('conteudo')
              
        <h1>Exclusão de Pedido: {{$pedido->id}}</h1>
            <form class="form-horizontal" action="/pedidos/destroy/{{$pedido->id}}" method="POST">
                @csrf
                
                    <h3>Cliente: {{$cliente->nome}}</h3></br>
                    
                    <p>Data de criação: {{$pedido->created_at}}</p></br>
                
                    <h3>Valor Total: R${{$pedido->total}}</h3><br/>
                    <p>Tem certeza que deseja excluir esse pedido?</p>
                
                <button class="btn-lg btn-danger">Excluir</button>
            </form>
            <br/><br/>
            <form action="/pedidos/lista">
                <button class="btn-lg btn-primary">Cancelar</button>
            </form>
            
@stop