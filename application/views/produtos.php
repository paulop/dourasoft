<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Produtos</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/css/style.css');?>">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"  type="text/javascript"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
   <?php include('public/componentes/header.inc');?>
   <main class="container">
      <section class="box-container">
         <div class="title">
            <h1>Cadastro produto</h1>
         </div>
         <div class="form-cliente">
            <form action="<?=base_url('produto/cadastrar')?>" method="post">
               <div class="input-container">
                  <input class="flex-3" type="text" id="codigo_produto" name="codigo_produto" placeholder="Código do produto">
                  <input class="flex-3" type="text" name="nome_produto" placeholder="Nome do produto">
               </div>
               <div class="input-container">
                  <input class="flex-9" type="text" name="descricao_produto" placeholder="Descrição do produto">
                  <input class="flex-1" type="text" name="preco" id="preco" placeholder="Preço do produto">
               </div>
               <div class="input-container">
                  <input class="flex-1" type="submit" value="Cadastrar produto">
               </div>
            </form>
            <div>
               <?php if(validation_errors() == true): ?>
                  <div class="danger"><?php echo validation_errors(); ?></div>
               <?php endif; ?>
               <?php if($this->session->flashdata('messagem')): ?>
                  <div class="sucess"><p><?=$this->session->flashdata('messagem') ?></p></div>
               <?php endif;  ?>
            </div>
         </div>
      </section>
      <section class="box-container">
         <div class="title">
            <h1>Produtos</h1>
         </div>
         <div class="produtos table">
            <table>
               <thead>
                  <tr>
                     <th>Código</th>
                     <th>Nome</th>
                     <th>Descrição</th>
                     <th>Preço</th>
                  </tr>
               </thead>
               <tbody>
                  <?php foreach ($produtos as $produto): ?>
                     <tr>
                        <td><?=$produto->codigo_produto ?></td>
                        <td><?=$produto->nome_produto ?></td>
                        <td><?=$produto->descricao_produto ?></td>
                        <td><?=$produto->preco ?></td>
                        <td><a href="<?=base_url("produto/excluir/{$produto->id_produto}") ?>">Excluir </a></td>
                        <td><a href="<?=base_url("produto/alterar/{$produto->id_produto}") ?>">Alterar</a></td>
                     </tr>
                  <?php endforeach; ?>
               </tbody>
            </table>
         </div>
      </section>
   </main>
</body>
<script type="text/javascript">
      $('#preco').mask('00,000');
      $('#codigo_produto').mask('#101010');
 </script>
</html>