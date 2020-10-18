<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Produtos Controller
 *
 * @property \App\Model\Table\ProdutosTable $Produtos
 * @method \App\Model\Entity\Produto[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ProdutosController extends AppController
{
    
    
    public function initialize(): void
    {
        parent::initialize();

        $components = $this->loadComponent('RequestHandler');
    }

    

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    //public $paginate = [
        // Outras chaves aqui.
    //    'maxLimit' => 9
    //];

  
    

    public function index()
    {
        
        $produtos = $this->Produtos->find('all');
        $response = $this->response;
        $response = $response->withStringBody(json_encode($produtos));

        return $response;
    }

    /**
     * View method
     *
     * @param string|null $id Produto id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $produto = $this->Produtos->get($id, [
            'contain' => [],
        ]);

        $this->set(compact('produto'));
    }

    public function ajax()
    {
       
        if ($this->request->is('ajax')) {
            
            $response = $this->response;
            $response = $response->withStringBody('produto adicionado ao carrinho');

            return $response;

          
        }
        
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições POST');
        $produto = $this->Produtos->newEmptyEntity();
        if ($this->request->is('post')) {
            $produto = $this->Produtos->patchEntity($produto, $this->request->getData());
            if ($this->Produtos->save($produto)) {
                $response = $response->withStringBody('Novo produto criado');
            }else{
                $response = $response->withStringBody('Erro ao criar novo produto');
            }
        }
        return $response;
    }

    /**
     * Edit method
     *
     * @param string|null $id Produto id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições PATCH, POST e PUT');
        $produto = $this->Produtos->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $produto = $this->Produtos->patchEntity($produto, $this->request->getData());
            if ($this->Produtos->save($produto)) {
                $response = $response->withStringBody('Dados do produto atualizados');
            }else{
                $response = $response->withStringBody('Erro ao atualizar dados do produto');
            }
        }
        return $response;
    }

    /**
     * Delete method
     *
     * @param string|null $id Produto id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições POST e DELETE');
        $this->request->allowMethod(['post', 'delete']);
        $produto = $this->Produtos->get($id);
        if ($this->Produtos->delete($produto)) {
            $response = $response->withStringBody('Produto removido');
        } else {
            $response = $response->withStringBody('Erro ao remover o produto');
        }

        return $response;
    }
}
