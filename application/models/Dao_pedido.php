<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Dao_pedido extends CI_Model{
	public function __construct(){
		parent::__construct();
	}
	public function cadastrarPedido($campos)
	{
		 $this->db->query("insert into pedidos VALUES (nextval('increment'),null, '{$campos['data_pedido']}','{$campos['id_cliente']}')");

			$insert_id = $this->db->insert_id();

   			return  $insert_id;
	}
	public function pedidoProduto($pedidos)
	{
		$this->db->set($pedidos);
		return $this->db->insert('pedido_produto');
	}
	public function pedidos()
	{
		$this->db->select('*');
		$this->db->from('pedido_produto');
		$this->db->join('pedidos','pedido_produto.id_pedido = pedidos.id_pedido');
		$this->db->join('produtos','pedido_produto.id_produto = produtos.id_produto');
		$this->db->join('clientes','pedidos.id_cliente = clientes.id_cliente');
		return $this->db->get()->result();
	}
	public function deletarPedido($id)
	{
		return $this->db->delete('pedido_produto',array('id_pedido_produto' =>$id));
	}
}


