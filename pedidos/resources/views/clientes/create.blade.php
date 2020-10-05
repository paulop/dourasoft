<!-- <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('site/bootstrap.css') }}">
    <script src="{{ asset('site/jquery.js') }}"></script> 
    <script src="{{ asset('site/bootstrap.js') }}"></script> 
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
    <title>Cadastrar um Novo Cliente</title>
</head>
<body>
    <div class="container"> -->
@extends('principal')

@section('conteudo')
        <h1>Cadastro de Novo Cliente</h1>

        @if(count($errors) > 0)
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('criar_novo_cliente') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="">Nome</label></br>
                <input class="form-control" type="text" name="nome"></br>
            </div>
            <div class="form-group">
                <label for="">Telefone</label></br>
                <input class="form-control" type="text" name="telefone"></br>
            </div>
            <div class="form-group">
                <label for="">Endereço</label></br>
                <input class="form-control" type="text" name="endereco"></br><br/>
            </div>
            <button class="btn-lg btn-primary">Salvar</button>
        </form>
        <form action="/clientes/">
            <button id="button_cancelar" class="btn btn-lg btn-danger mt-3">Cancelar</button><br/>
        </form>
@stop
<!--     </div>   
</body>
</html> -->