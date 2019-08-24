<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Produto extends CI_Controller {
	public function index()
	{
		$data['produtos'] = $this->Dao_produto->produtos();
		$this->load->view('produtos',$data);
	}
	public function salvarProduto(){
		$this->form_validation->set_rules('codigo_produto','Código do produto','required');
		$this->form_validation->set_rules('nome_produto','Nome do produto','required');
		$this->form_validation->set_rules('descricao_produto','Descrição do produto','required');
		$this->form_validation->set_rules('preco','Preço do produto','required');

		if($this->form_validation->run() == false){
			$data['produtos'] = $this->Dao_produto->produtos();
			$this->load->view('produtos',$data);
		}else{
			$cadastrarProduto = $this->Dao_produto->cadastrarProduto($this->input->post());

			if($cadastrarProduto == 1){
				$this->session->set_flashdata('messagem','produto cadastrado com sucesso.');
				redirect('/produtos');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel cadastrar novo produto, tente novamente.');
				redirect('/produtos');
			}
		}
	}
	public function editarProduto($id)
	{
		$data['produto'] = $this->Dao_produto->getProduto($id);
		
		if(count($data['produto'] )== 0){
			$this->session->set_flashdata('messagem','Produto não encontrado.');
			redirect('/produtos');
		}else{
			$this->load->view('editarProduto',$data);
		}
	}
	public function deletarProduto($id)
	{
		if(verificar_foreign($id,'pedido_produto','id_produto') > 0){
			$this->session->set_flashdata('messagem','Não é possivel deletar produto');
			redirect('/produtos');
		}else{
			$deletarProduto = $this->Dao_produto->excluirProduto($id);
			$this->session->set_flashdata('messagem','Produto deletado com sucesso.');
			redirect('/produtos');
		}
		
	}
	public function editarProdutoSalvar($id){
		$this->form_validation->set_rules('codigo_produto','Código do produto','required');
		$this->form_validation->set_rules('nome_produto','Nome do produto','required');
		$this->form_validation->set_rules('descricao_produto','Descrição do produto','required');
		$this->form_validation->set_rules('preco','Preço do produto','required');

		if($this->form_validation->run() == false){
			$data['produtos'] = $this->Dao_produto->produtos();
			$this->load->view('produtos',$data);
		}else{
			$editarProduto= $this->Dao_produto->alterarProduto($id,$this->input->post());

			if($editarProduto == 1){
				$this->session->set_flashdata('messagem','Produto alterado	com sucesso.');
				redirect('/produtos');
			}else{
				$this->session->set_flashdata('messagem','Nao foi possivel alterar o cadastro do cliente, tente novamente.');
				redirect('/produtos');
			}
		}
	}
}
