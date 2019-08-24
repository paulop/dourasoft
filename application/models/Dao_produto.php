<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Dao_produto extends CI_Model{
	public function __construct(){
		parent::__construct();
	}
	public function cadastrarProduto($campos)
	{
		return $this->db->query("insert into produtos VALUES (nextval('increment'), '{$campos['codigo_produto']}', '{$campos['nome_produto']}','{$campos['descricao_produto']}','{$campos['preco']}')");
	}
	public function produtos()
	{
		$this->db->order_by('id_produto','desc');
		return $this->db->get('produtos')->result();
	}
	public function getProduto($id)
	{
		$this->db->where('id_produto',$id);
		return $this->db->get('produtos')->result();
	}
	public function excluirProduto($id)
	{
		return $this->db->delete('produtos',array('id_produto' =>$id));
		
	}
	public function alterarProduto($id,$campos)
	{
		$this->db->set($campos);
		$this->db->where('id_produto',$id);
		return $this->db->update('produtos');
	}
}


