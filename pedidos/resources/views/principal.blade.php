<!DOCTYPE html>
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
        <title>Gerenciador de Pedidos</title>
    </head>
    <body>
        <div class="container">
            <nav class="navbar navbar-default"> 
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            Gerenciador de Pedidos
                        </a>
                    </div>
                    <div class="d-flex">
                        <ul class="nav navbar-nav navbar-right"> 
                            <li><a  href="/pedidos">Pedidos</a></li>   
                        </ul>
                        <ul class=" nav navbar-nav navbar-right"> 
                            <li><a class="ml-3" href="/clientes">Clientes</a></li>   
                        </ul>
                        <ul class=" nav navbar-nav navbar-right"> 
                            <li><a class="ml-3" href="/produtos">Produtos</a></li>   
                        </ul>
                    </div>
                    
                        
                </div>
            </nav>
            <div class="container">

                @yield('conteudo')

            </div>
            <footer class="footer">
                <p>Desafio Dourasoft 2020.  Desenvolvido por Igor Gavilon.</p>
            </footer>
        </div>
        <!-- CÓDIGOS JAVASCRIPT, REQUESTS JQUERY :: LÓGICAS DE INSERÇÃO DE CLIENTE E PRODUTOS NA LISTA --> 
        <script src="{{ asset('site/js/script.js') }}"></script>
    </body>
</html>