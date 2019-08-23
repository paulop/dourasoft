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
            <h1>Alterar informações do cliente</h1>
         </div>
         <div class="form-cliente">
            <form action="<?=base_url("cliente/alterar/salvar/{$cliente[0]->id_cliente}")?>" method="post">
               <div class="input-container">
                  <input class="flex-3" type="text" name="nome_cliente" value="<?=$cliente[0]->nome_cliente ?>">
                  <input class="flex-3" type="text" name="telefone_cliente" value="<?=$cliente[0]->telefone_cliente ?>">
                  <input class="flex-3" type="text" name="endereco_cliente" value="<?=$cliente[0]->endereco_cliente ?>">
                  <input class="flex-1" type="submit" value="Salvar alterações">
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
    <script type="text/javascript">
           $('#telefone_cliente').mask('(67) 99834-3255');
      </script>
</body>
</html>