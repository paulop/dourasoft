<?php
defined('BASEPATH') OR exit('No direct script access allowed');


$autoload['packages'] = array();


$autoload['libraries'] = array('database','session','form_validation','pagination');

$autoload['helper'] = array('url','form','date','verificar_foreign_helper');

$autoload['drivers'] = array();

$autoload['config'] = array();

$autoload['language'] = array();

$autoload['model'] = array('Dao_cliente','Dao_pedido','Dao_produto');
