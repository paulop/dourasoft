<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Dao_cliente extends CI_Model{
	public function __construct(){
		parent::__construct();
	}
	public function cadastrarCliente($campos)
	{
		return $this->db->query("insert into clientes VALUES (nextval('increment'), '{$campos['nome_cliente']}', '{$campos['telefone_cliente']}','{$campos['endereco_cliente']}')");
	}
	public function clientes()
	{
		$this->db->order_by('id_cliente','desc');
		return $this->db->get('clientes')->result();
	}
	public function getCliente($id)
	{
		$this->db->where('id_cliente',$id);
		return $this->db->get('clientes')->result();
	}
	public function excluirCliente($id)
	{
		return $this->db->delete('clientes',array('id_cliente' =>$id));
	}
	public function alterarCliente($id,$campos)
	{
		$this->db->set($campos);
		$this->db->where('id_cliente',$id);
		return $this->db->update('clientes');
	}
}


