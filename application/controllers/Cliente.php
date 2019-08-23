<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cliente extends CI_Controller {
	public function index()
	{
		$data['clientes'] = $this->Dao_cliente->clientes();
		$this->load->view('clientes',$data);
	}
	public function salvarCliente(){
		$this->form_validation->set_rules('nome_cliente','Nome do cliente','required');
		$this->form_validation->set_rules('telefone_cliente','Telefone do cliente','required');
		$this->form_validation->set_rules('endereco_cliente','endereço do cliente','required');

		if($this->form_validation->run() == false){
			$data['clientes'] = $this->Dao_cliente->clientes();
			$this->load->view('clientes',$data);
		}else{
			$cadastrarUsuario = $this->Dao_cliente->cadastrarCliente($this->input->post());

			if($cadastrarUsuario == 1){
				$this->session->set_flashdata('messagem','cliente cadastrada com sucesso.');
				redirect('/');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel cadastrar cliente, tente novamente.');
				redirect('/');
			}
		}
	}
	public function editarCliente($id)
	{
		$data['cliente'] = $this->Dao_cliente->getCliente($id);
		
		if(count($data['cliente'] )== 0){
			$this->session->set_flashdata('messagem','Cliente não encontrado.');
			redirect('/');
		}else{
			$this->load->view('editarCliente',$data);
		}
	}
	public function deletarCliente($id)
	{
		$this->Dao_cliente->excluirCliente($id);
		$this->session->set_flashdata('messagem','Cliente deletado com sucesso.');
		redirect('/');
	}
	public function editarClienteSalvar($id){
		$this->form_validation->set_rules('nome_cliente','Nome do cliente','required');
		$this->form_validation->set_rules('telefone_cliente','Telefone do cliente','required');
		$this->form_validation->set_rules('endereco_cliente','endereço do cliente','required');

		if($this->form_validation->run() == false){
			$data['cliente'] = $this->Dao_cliente->getCliente($id);
			$this->load->view('editarCliente',$data);
		}else{
			$editarUsuario = $this->Dao_cliente->alterarCliente($id,$this->input->post());

			if($editarUsuario == 1){
				$this->session->set_flashdata('messagem','Cadastro alterado	 com sucesso.');
				redirect('/');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel alterar o cadastro do cliente, tente novamente.');
				redirect('/');
			}
		}
	}
}
