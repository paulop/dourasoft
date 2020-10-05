@extends('principal')

@section('conteudo')
        <div>
            <h1>Listagem de Pedidos</h1>
            
            @if(old('cliente_id'))
                <div class="alert alert-success">
                    Novo pedido foi adicionado.
                </div>
            @endif

            <a class="btn btn-success" href="/pedidos/novo"><b>Criar Novo</b></a>
        </div>
        @if(empty($pedidos))
                <div class="alert alert-danger">
                    Nenhum Pedido Cadastrado.
                </div>
        @else
        <table class="table table-striped table-bordered table-hover">
            <tr>
                <th>ID</th>
                <th>Data de Criação</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Status</th>
                <th>Detalhes</th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
        
            @foreach ($pedidos as $p)
            <tr>
                <td>{{$p->id}}</td>
                <td>{{$p->created_at}}</td>
                <td>{{$p->cliente_id}}</td>
                <td>R${{$p->total}}</td>
                <td>{{$p->status}}</td>
                <td><a class="btn btn-primary" href="/pedidos/detalhes/{{$p->id}}">
                    <b>detalhes</b>
                </td>
                <td><a class="btn btn-success" href="/pedidos/editar/{{$p->id}}">
                    <b>editar</b>
                </td>
                <td><a class="btn btn-danger" href="/pedidos/excluir/<?= $p->id ?>">
                    <b>excluir</b>
                </td>
            </tr>
            @endforeach
        
        </table>
        <div>
            {{$pedidos->links()}}
        </div>
        @endif
@stop        
