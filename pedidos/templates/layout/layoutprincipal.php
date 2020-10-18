<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Grerenciador de Pedidos</title>
    <!-- Include CSS -->
    <?= $this->Html->css('bootstrap.min.css'); ?>
    <?= $this->Html->css('starter-template.css'); ?>
  </head>

    <body>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Gerenciador de Pedidos</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pedidos</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
                <?= $this->Html->link('Listar', '/pedidos', array('class' => 'dropdown-item')); ?>
                <?= $this->Html->link('Novo', '/pedidos/add', array('class' => 'dropdown-item')); ?>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Clientes</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
                <?= $this->Html->link('Listar', '/clientes', array('class' => 'dropdown-item')); ?>
                <?= $this->Html->link('Novo', '/clientes/add', array('class' => 'dropdown-item')); ?>
            
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Produtos</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
                <?= $this->Html->link('Listar', '/produtos', array('class' => 'dropdown-item')); ?>
                <?= $this->Html->link('Novo', '/produtos/add', array('class' => 'dropdown-item')); ?>
            </div>
        </li>
        </ul>
    </div>
    </nav>

    <main role="main" class="container">
    <!-- conteudo -->
        <?= $this->Flash->render() ?>
        <?= $this->fetch('content') ?>
    </main>
    <?= $this->Html->script('jquery-3.5.1.min.js'); ?>
    <?= $this->Html->script('bootstrap.bundle.min.js'); ?>
    <?= $this->Html->script('produtos_scripts.js'); ?>

    </body>
</html>


