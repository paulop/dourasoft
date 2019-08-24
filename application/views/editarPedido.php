<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Clientes</title>
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
            <h1>Aletrar solicitação pedido</h1>
         </div>
         <div class="form-cliente">
            <form action="<?=base_url("pedido/editar/salvar/{$produtos_pedido[0]->id_pedido}")?>" method="post">
               <div class="input-container">
                  <select class="flex-3 select" name="id_cliente">
                     <option value='<?=$produtos_pedido[0]->id_cliente ?>'>Cliente atual:<?=$produtos_pedido[0]->nome_cliente ?> </option>
                     <?php foreach ($clientes as $cliente):?>
                        <option selected value="<?=$cliente->id_cliente?>"><?=$cliente->nome_cliente ?></option>
                     <?php endforeach; ?>
                  </select>
                  <input class="flex-3" type="date" name="data_pedido" value='<?=$produtos_pedido[0]->data_pedido ?>'>
               </div>
               <di class='input-container'>
                   <select class="flex-3" name="pedidos[]" multiple>
                     <option value=''>Selecionar cliente</option>
                     <?php foreach ($produtos_pedido as $produto):?>
                        <option selected value="<?=$produto->id_produto ?>">Produto solicitado :<?=$produto->nome_produto ?> - preço: <?=$produto->preco ?></option>
                     <?php endforeach; ?>
                      <?php foreach ($produtos as $produto):?>
                        <option  value="<?=$produto->id_produto ?>"><?=$produto->nome_produto ?> - preço: <?=$produto->preco ?></option>
                     <?php endforeach; ?>
                  </select>
               </div>
               <div class="input-container">
                  <input class="flex-1" type="submit" value="Alterar pedido">
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
   </main>
</body>
</html>