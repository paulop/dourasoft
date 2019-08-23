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
            <h1>Cadastro cliente</h1>
         </div>
         <div class="form-cliente">
            <form action="<?=base_url('cliente/cadastrar')?>" method="post">
               <div class="input-container">
                  <input class="flex-3" type="text" name="nome_cliente" placeholder="Nome do cliente completo">
                  <input class="flex-3" type="text" id='telefone_cliente' name="telefone_cliente" placeholder="Telefone do cliente">
                  <input class="flex-3" type="text" name="endereco_cliente" placeholder="Endereço do cliente">
                  <input class="flex-1" type="submit" value="Cadastrar cliente">
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
            <h1>Clientes</h1>
         </div>
         <div class="clientes table">
            <table>
               <thead>
                  <tr>
                     <th>Nome completo</th>
                     <th>Telefone</th>
                     <th>Endereço</th>
                  </tr>
               </thead>
               <tbody>
                  <?php foreach ($clientes as $cliente): ?>
                     <tr>
                        <td><?=$cliente->nome_cliente ?></td>
                        <td><?=$cliente->telefone_cliente ?></td>
                        <td><?=$cliente->endereco_cliente ?></td>
                        <td><a href="<?=base_url("cliente/excluir/{$cliente->id_cliente}") ?>">Excluir </a></td>
                        <td><a href="<?=base_url("cliente/alterar/{$cliente->id_cliente}") ?>">Alterar</a></td>
                     </tr>
                  <?php endforeach; ?>
               </tbody>
            </table>
         </div>
      </section>
   </main>
      <script type="text/javascript">
           $('#telefone_cliente').mask('(67) 99834-3255');
      </script>
</body>
</html>