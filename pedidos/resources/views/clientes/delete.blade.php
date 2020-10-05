@extends('principal')

@section('conteudo')
              
        <h1>Exclusão de Cliente: {{$cliente->nome}}</h1>
        <form class="form-horizontal" action="/clientes/destroy/{{$cliente->id}}" method="POST">
            @csrf
            
            <h3>Cliente: {{$cliente->nome}}</h3></br>
            <p>Telefone: {{$cliente->telefone}}</p></br>
            <p>Tem certeza que deseja excluir esse cliente?</p>
            <button class="btn-lg btn-danger">Excluir</button>
        </form>
        <br/>
        <form action="/clientes/lista">
            <button class="btn-lg btn-primary">Cancelar</button>
        </form>
@stop
