@extends('principal')          

@section('conteudo')
        <h1>Exclusão de Produto: {{$produto->nome}}</h1>
        <form class="form-horizontal" action="/produtos/destroy/{{$produto->id}}" method="POST">
            @csrf
            
            <h3>Produto: {{$produto->nome}}</p></h3>
            <p>Descrição: {{$produto->descricao}}</p></br>
            <h3>Preço: R${{$produto->preco}}</h3></br>
            <p>Tem certeza que deseja excluir esse produto?</p>
            <button class="btn-lg btn-danger">Excluir</button>
        </form>
        <br/><br/>
        <form action="/produtos/lista">
            <button class="btn-lg btn-primary">Cancelar</button>
        </form>
@stop
