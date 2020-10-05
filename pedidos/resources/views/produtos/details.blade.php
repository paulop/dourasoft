@extends('principal')

@section('conteudo')

        <h1>Detalhes do Produto: {{$produto->nome }}</h1>
        <div class="">
            <b>Descrição: </b>{{$produto->descricao}}<br/>
            <b>Preço: </b>{{$produto->preco}}<br/>
        </div>
        <br/>
        <form action="/produtos/lista">
            <button class="btn-lg btn-primary">voltar</button>
        </form>
@stop