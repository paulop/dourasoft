<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pedido extends CI_Controller {
	public function index()
	{
		$data['pedidos'] = $this->Dao_pedido->pedidos();
		$data['clientes'] = $this->Dao_cliente->clientes();
		$data['produtos'] = $this->Dao_produto->produtos();
		$this->load->view('pedidos',$data);
	}
	public function solicitarPedido()
	{
		$this->form_validation->set_rules('data_pedido','Digite data de solicitação de pedido','required');
		$this->form_validation->set_rules('id_cliente','Selecione um cliente','required');
		$this->form_validation->set_rules('pedidos[]','Selecione o(s) produtos','required');

		if($this->form_validation->run() == false){
			$data['pedidos'] = $this->Dao_pedido->pedidos();
			$data['clientes'] = $this->Dao_cliente->clientes();
			$data['produtos'] = $this->Dao_produto->produtos();
			$this->load->view('pedidos',$data);
		}else{
			$pedidoId = $this->Dao_pedido->cadastrarPedido($this->input->post());
			$pedidos = $this->input->post('pedidos[]');

			foreach ($pedidos as $pedido) {
				$this->Dao_pedido->pedidoProduto(array('id_pedido' => $pedidoId ,'id_produto'=>$pedido ));
			}
			if($pedidoId){
				$this->session->set_flashdata('messagem','Pedido realizado com sucesso.');
				redirect('/pedidos');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel realizar pedido, tente novamente.');
				redirect('/pedidos');
			}
		}
	}
	public function deletarPedido($id)
	{
		$this->Dao_pedido->deletarPedido($id);
		$this->session->set_flashdata('messagem','Pedido deletado com sucesso.');
		redirect('/pedidos');
	}
	public function editarPedido($id)
	{
		$data['clientes'] = $this->Dao_cliente->clientes();
		$data['produtos'] = $this->Dao_produto->produtos();
		$pedido = $this->Dao_pedido->getPedido($id);
		$data['produtos_pedido'] = $this->Dao_pedido->getPedidoProdutos($pedido[0]->id_pedido);
		$this->load->view('editarPedido',$data);
	}
	public function salvarPedido($id)
	{
		$this->form_validation->set_rules('data_pedido','Digite data de solicitação de pedido','required');
		$this->form_validation->set_rules('id_cliente','Selecione um cliente','required');
		$this->form_validation->set_rules('pedidos[]','Selecione o(s) produtos','required');

		if($this->form_validation->run() == false){
			$data['pedidos'] = $this->Dao_pedido->pedidos();
			$data['clientes'] = $this->Dao_cliente->clientes();
			$data['produtos'] = $this->Dao_produto->produtos();
			$this->load->view('pedidos',$data);
		}else{
			$pedido = array('id_cliente' => $this->input->post('id_cliente'),'data_pedido'=> $this->input->post('data_pedido'));
			$this->Dao_pedido->editarpedidoProduto($id,$pedido);
			$pedidos = $this->input->post('pedidos[]');

			foreach ($pedidos as $pedido) {
				$this->Dao_pedido->editarItempedido($id,array('id_pedido' => $id ,'id_produto'=>$pedido ));
			}
			if($pedido){
				$this->session->set_flashdata('messagem','Pedido realizado com sucesso.');
				redirect('/pedidos');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel realizar pedido, tente novamente.');
				redirect('/pedidos');
			}
		}
	}
}
