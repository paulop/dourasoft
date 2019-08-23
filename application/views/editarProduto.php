<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Editar - produto</title>
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
            <h1>Alterar informações do produto</h1>
         </div>
         <div class="form-cliente">
            <form action="<?=base_url("produto/alterar/salvar/{$produto[0]->id_produto}")?>" method="post">
               <div class="input-container">
                  <input class="flex-3" type="text" value="<?=$produto[0]->codigo_produto ?>" name="codigo_produto" placeholder="Código do produto">
                  <input class="flex-3" type="text" value="<?=$produto[0]->nome_produto ?>" name="nome_produto" placeholder="Nome do produto">
               </div>
               <div class="input-container">
                  <input class="flex-9" type="text" value="<?=$produto[0]->descricao_produto ?>" name="descricao_produto" placeholder="Descrição do produto">
                  <input class="flex-1" type="text" value="<?=$produto[0]->preco ?>" id='preco' name="preco" placeholder="Preço do produto">
               </div>
               <div class="input-container">
                  <input class="flex-1" type="submit" value="Alterar produto">
               </div>
            </form>
            <div>
               <?php if(validation_errors() == true): ?>
                  <div class="danger"><?php echo validation_errors(); ?></div>
               <?php endif; ?>
            </div>
         </div>
      </section>
   </main>
</body>
 <script type="text/javascript">
      $('#preco').mask('0,00');
 </script>
</html>