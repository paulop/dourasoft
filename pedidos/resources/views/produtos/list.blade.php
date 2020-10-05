@extends('principal')

@section('conteudo')
        <div>
            <h1>Listagem de Produtos</h1>
            
            @if(old('nome'))
                <div class="alert alert-success">
                    Produto {{old('nome')}} foi adicionado.
                </div>
            @endif

            <a class="btn btn-success" href="/produtos/novo"><b>Criar Novo</b></a>
        </div>
        

            @if(empty($produtos))
                <div class="alert alert-danger" alert-danger>
                    Nenhum produto Cadastrado.
                </div>
            @else
        <table class="table table-striped table-bordered table-hover">
            
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Detalhes</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
                @foreach ($produtos as $p)
            <tr>
                <td>{{$p->codigo}}</td>
                <td>{{$p->nome}}</td>
                <td>{{$p->descricao}}</td>
                <td>R${{$p->preco}}</td>
                <td><a class="btn btn-primary" href="/produtos/detalhes/<?= $p->id ?>">
                    <b>detalhes</b>
                    <!-- <span class="glyphicon glyphicon-search"></span></a> -->
                </td>
                <td><a class="btn btn-success" href="/produtos/editar/<?= $p->id ?>">
                    <b>editar</b>
                    <!-- <span class="glyphicon glyphicon-pencil green"></span></a> -->
                </td>
                <td><a class="btn btn-danger" href="/produtos/excluir/<?= $p->id ?>">
                    <b>excluir</b>
                    <!-- <span class="glyphicon glyphicon-remove red" ></span></a> -->
                </td>
            </tr>
                @endforeach
            
        </table>
        <div>
            {{$produtos->links()}}
        </div>
            @endif

@stop
