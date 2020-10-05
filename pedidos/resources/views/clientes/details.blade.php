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
 
    <title>Detalhes do Cliente</title>
</head>
<body>
    <div class="container"> -->
@extends('principal')

@section('conteudo')
        <h1>Detalhes do Cliente: {{$cliente->nome }}</h1>
        <div class="">
            <b>Telefone: </b>{{$cliente->telefone}}<br/>
            <b>Endereço: </b>{{$cliente->endereco}}<br/>
        </div>
        <br/>
        <form action="/clientes/lista">
            <button class="btn-lg btn-primary">voltar</button>
        </form>
@stop
<!--     </div>
</body>
</html> -->