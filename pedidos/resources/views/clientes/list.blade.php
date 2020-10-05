<!-- <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('site/bootstrap.css') }}">
    <script src="{{ asset('site/jquery.js') }}"></script> 
    <script src="{{ asset('site/bootstrap.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('site/css/style.css') }}">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
 
    <title>Listagem de todos os Clientes</title>
</head>
<body>
    <div class="container"> -->
@extends('principal')

@section('conteudo')
        <h1>Listagem de Clientes</h1>

        @if(old('nome'))
            <div class="alert alert-success">
                O cliente {{old('nome')}} foi adicionado.
            </div>
        @endif

        <a class="btn btn-success" href="/clientes/novo"><b>Criar Novo</b></a>
        
        @if(empty($clientes))
                <div class="alert alert-danger">
                    Nenhum Cliente Cadastrado.
                </div>
        @else
        <table class="table table-striped table-bordered table-hover">
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Detalhes</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
            @foreach ($clientes as $cl)
            <tr>
                <td>{{$cl->nome}}</td>
                <td>{{$cl->telefone}}</td>
                <td>{{$cl->endereco}}</td>
                <td><a class="btn btn-primary" href="/clientes/detalhes/<?= $cl->id ?>">
                    <b>detalhes</b>
                    <!-- <span class="glyphicon glyphicon-search"></span></a> -->
                </td>
                <td><a class="btn btn-success" href="/clientes/editar/<?= $cl->id ?>">
                    <b>editar</b>
                    <!-- <span class="glyphicon glyphicon-pencil green"></span></a> -->
                </td>
                <td><a class="btn btn-danger" href="/clientes/excluir/<?= $cl->id ?>">
                    <b>excluir</b>
                    <!-- <span class="glyphicon glyphicon-remove red" ></span></a> -->
                </td>
            </tr>
            @endforeach
        </table>
        <div>
            {{$clientes->links()}}
        </div>
            

        @endif
@stop
<!--     </div>
</body>
</html> -->