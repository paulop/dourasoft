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
    <title>Cadastrar um Novo Cliente</title>
</head>
<body>
    <div class="container"> -->
@extends('principal')

@section('conteudo')

        <h1>Cadastro de Novo Produto</h1>
        @if(count($errors) > 0)
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form action="{{ route('criar_novo_produto') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="">Código</label></br>
                <input class="form-control" type="text" name="codigo"></br>
            </div>
            <div class="form-group">
                <label for="">Nome</label></br>
                <input class="form-control" type="text" name="nome"></br>
            </div>
            <div class="form-group">
                <label for="">Descrição</label></br>
                <textarea class="form-control" name="descricao" maxlength="255" ></textarea></br>
            </div>
            <div class="form-group">
                <label for="">Preço R$</label></br>
                <input class="form-control" type="text" name="preco"></br>
            </div>
            <button class="btn-lg btn-primary">Salvar</button>
        </form>
        <br/>
        <form action="/produtos">
            <button class="btn-lg btn-danger">Cancelar</button>
        </form>

@stop