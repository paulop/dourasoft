<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Dao_pedido extends CI_Model{
	public function __construct(){
		parent::__construct();
	}
	public function cadastrarPedido($campos)
	{
		 $this->db->query("insert into pedidos VALUES (nextval('increment'),0, '{$campos['data_pedido']}','{$campos['id_cliente']}')");

			$insert_id = $this->db->insert_id();

   			return  $insert_id;
	}
	public function pedidoProduto($pedidos)
	{
		$this->db->set($pedidos);
		return $this->db->insert('pedido_produto');
	}
	public function editarpedidoProduto($id,$pedidos)
	{
		$this->db->where('id_pedido',$id);
		$this->db->set($pedidos);
		return $this->db->update('pedidos');
	}
	public function editarItempedido($id,$item_pedido)
	{
		$this->db->where('id_pedido',$id);
		$this->db->set($item_pedido);
		return $this->db->update('pedido_produto');
	}
	public function pedidos()
	{
		$this->db->select('*');
		$this->db->from('pedidos');
		$this->db->join('clientes','pedidos.id_cliente = clientes.id_cliente');
		return $this->db->get()->result();
	}
	public function getPedido($id)
	{
		$this->db->select('*');
		$this->db->from('pedidos');
		$this->db->where('id_pedido',$id);
		$this->db->join('clientes','pedidos.id_cliente = clientes.id_cliente');
		return $this->db->get()->result();
	}
	public function getPedidoProdutos($id)
	{
		$this->db->select('*');
		$this->db->from('pedidos');
		$this->db->where('pedidos.id_pedido',$id);
		$this->db->join('clientes','pedidos.id_cliente = clientes.id_cliente');
		$this->db->join('pedido_produto','pedido_produto.id_pedido = pedidos.id_pedido');
		$this->db->join('produtos','pedido_produto.id_produto = produtos.id_produto');
		return $this->db->get()->result();
	}
	public function deletarPedido($id)
	{
		return $this->db->delete('pedidos',array('id_pedido' =>$id));
	}
}


