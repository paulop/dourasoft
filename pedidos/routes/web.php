<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('teste');
});

########Routes for clients

Route::get('/clientes/novo', 'ClienteController@create');

Route::post('/clientes/novo', 'ClienteController@store')->name('criar_novo_cliente');

Route::post('/clientes/novomodal', 'ClienteController@storemodal');

Route::post('/clientes/update/{id}', 'ClienteController@update')->name('editar_dados_cliente');

Route::get('/clientes/lista', 'ClienteController@lista');

Route::get('/clientes/detalhes/{id}', 'ClienteController@detalhes');

Route::get('/clientes/excluir/{id}', 'ClienteController@delete');

Route::get('/clientes/editar/{id}', 'ClienteController@editar');

Route::post('/clientes/destroy/{id}', 'ClienteController@destroy');

Route::get('/clientes', 'ClienteController@lista');

Route::get('/pesquisa/clientes', 'PesquisaController@clientes');

########Routes for products

Route::get('/produtos/novo', 'ProdutoController@create');

Route::post('/produtos/novo', 'ProdutoController@store')->name('criar_novo_produto');

Route::get('/produtos/lista', 'ProdutoController@lista');

Route::get('/produtos/detalhes/{id}', 'ProdutoController@detalhes');

Route::get('/produtos/editar/{id}', 'ProdutoController@editar');

Route::post('/produtos/update/{id}', 'ProdutoController@update')->name('update_produto');

Route::get('/produtos', 'ProdutoController@lista');

Route::get('/pesquisa/produtos', 'PesquisaController@produtos');

Route::get('/pesquisa/detalhes/{id}', 'PesquisaController@detalhes');

Route::get('/produtos/excluir/{id}', 'ProdutoController@delete');

Route::post('/produtos/destroy/{id}', 'ProdutoController@destroy');


########Routes for purchase requests

Route::get('/pedidos/novo', 'PedidoController@create');

Route::post('/pedidos/novo', 'PedidoController@store')->name('criar_novo_pedido');

Route::get('/pedidos/lista', 'PedidoController@lista');

Route::get('/pedidos/detalhes/{id}', 'PedidoController@detalhes');

Route::get('/pedidos/editar/{id}', 'PedidoController@editar');

Route::post('/pedidos/update/{pedido_id}', 'PedidoController@update')->name('update_pedido');

Route::get('/pedidos/excluir/{id}', 'PedidoController@delete');

Route::post('/pedidos/destroy/{pedido_id}', 'PedidoController@destroy');

Route::get('/pedidos', 'PedidoController@lista');


