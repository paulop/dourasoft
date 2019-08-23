<?php
defined('BASEPATH') OR exit('No direct script access allowed');


$route['default_controller'] = 'cliente';



// cliente 

$route['cliente/cadastrar'] = 'cliente/salvarCliente';
$route['cliente/alterar/(:any)'] = 'cliente/editarCliente/$1';
$route['cliente/alterar/salvar/(:any)'] = 'cliente/editarClienteSalvar/$1';
$route['cliente/excluir/(:any)'] = 'cliente/deletarCliente/$1';

// fim 

// produto 

$route['produtos'] = 'produto';
$route['produto/cadastrar'] = 'produto/salvarProduto';
$route['produto/alterar/(:any)'] = 'produto/editarProduto/$1';
$route['produto/alterar/salvar/(:any)'] = 'produto/editarProdutoSalvar/$1';
$route['produto/excluir/(:any)'] = 'produto/deletarProduto/$1';

// fim 

// pedidos 

$route['pedidos'] = 'pedido';
$route['pedido/solicitar'] = 'pedido/solicitarPedido';
$route['pedido/excluir/(:any)'] = 'pedido/deletarPedido/$1';



$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

