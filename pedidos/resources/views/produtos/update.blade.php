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
    <title>Editar Produto</title>
</head>
<body>
    <div class="container"> -->
@extends('principal')

@section('conteudo')
        <h1>Editar Produto</h1>
        <form action="{{ route('update_produto', ['id' => $produto->id]) }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="">Código</label></br>
                <input class="form-control" type="text" name="codigo" value="{{$produto->codigo}}"></br>
            </div>
            <div class="form-group">
                <label for="">Nome</label></br>
                <input class="form-control" type="text" name="nome" value="{{$produto->nome}}"></br>
            </div>
            <div class="form-group">
                <label for="">Descrição</label></br>
                <textarea class="form-control" name="descricao" maxlength="255" >{{$produto->descricao}}</textarea></br>
            </div>
            <div class="form-group">
                <label for="">Preço R$</label></br>
                <input class="form-control" type="text" name="preco" value="{{$produto->preco}}"></br>
            </div>
            <button class="btn-lg btn-primary">Salvar Alterações</button>
        </form>
        <br/>
        <form action="/produtos/lista">
            <button class="btn-lg btn-danger">Cancelar</button>
        </form>
@stop
<!--     </div> 
</body>
</html> -->