<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * ListaDeProdutos Controller
 *
 * @property \App\Model\Table\ListaDeProdutosTable $ListaDeProdutos
 * @method \App\Model\Entity\ListaDeProduto[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ListaDeProdutosController extends AppController
{
    
    public function initialize(): void
    {
        parent::initialize();

        $components = $this->loadComponent('RequestHandler');
        $this->loadModel('ListaDeProdutos');
    }

    
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        //$pedidos = $this->paginate($this->Pedidos, ['contain' => ['Clientes', 'ListaDeProdutos']]);

        //$this->set(compact('pedidos'));
        //$pedidos = $this->Pedidos->find('all');
        $this->paginate = [
            'contain' => ['Pedidos', 'Produtos'],
        ];
        $listaDeProdutos = $this->paginate($this->ListaDeProdutos);

        //$this->set(compact('listaDeProdutos'));
        $response = $this->response;
        $response = $response->withStringBody(json_encode($listaDeProdutos));

        return $response;
    }

    /**
     * View method
     *
     * @param string|null $id Lista De Produto id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        
        $listaDeProduto = $this->ListaDeProdutos->get($id, [
            'contain' => ['Produtos'],
        ]);
        //$listaDeProduto = $this->ListaDeProdutos->find('all');

        //$this->set(compact('listaDeProduto'));
        $response = $this->response;
        $response = $response->withStringBody(json_encode($listaDeProduto));

        return $response;
    }

    public function searchlista($pedido_id = null)
    {
        
        $listaDeProdutos = $this->ListaDeProdutos->find('all', [
            'contain' => ['Produtos'], 'conditions' => ['pedido_id' => $pedido_id]
        ]);
       /* $lista = $this->ListaDeProdutos->get('all');

        //$this->set(compact('listaDeProduto'));
        $response = $this->response;
        $response = $response->withStringBody(json_encode($lista));

        return $response;*/
        //$this->paginate = [
        //    'contain' => ['Pedidos', 'Produtos'],
        //];
        //$listaDeProdutos = $this->paginate($this->ListaDeProdutos);

        //$this->set(compact('listaDeProdutos'));
        $response = $this->response;
        $response = $response->withStringBody(json_encode($listaDeProdutos));

        return $response;
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $listaDeProduto = $this->ListaDeProdutos->newEmptyEntity();
        if ($this->request->is('post')) {
            $listaDeProduto = $this->ListaDeProdutos->patchEntity($listaDeProduto, $this->request->getData());
            if ($this->ListaDeProdutos->save($listaDeProduto)) {
                $this->Flash->success(__('The lista de produto has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The lista de produto could not be saved. Please, try again.'));
        }
        $pedidos = $this->ListaDeProdutos->Pedidos->find('list', ['limit' => 200]);
        $produtos = $this->ListaDeProdutos->Produtos->find('list', ['limit' => 200]);
        $this->set(compact('listaDeProduto', 'pedidos', 'produtos'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Lista De Produto id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $listaDeProduto = $this->ListaDeProdutos->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $listaDeProduto = $this->ListaDeProdutos->patchEntity($listaDeProduto, $this->request->getData());
            if ($this->ListaDeProdutos->save($listaDeProduto)) {
                $this->Flash->success(__('The lista de produto has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The lista de produto could not be saved. Please, try again.'));
        }
        $pedidos = $this->ListaDeProdutos->Pedidos->find('list', ['limit' => 200]);
        $produtos = $this->ListaDeProdutos->Produtos->find('list', ['limit' => 200]);
        $this->set(compact('listaDeProduto', 'pedidos', 'produtos'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Lista De Produto id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $listaDeProduto = $this->ListaDeProdutos->get($id);
        if ($this->ListaDeProdutos->delete($listaDeProduto)) {
            $this->Flash->success(__('The lista de produto has been deleted.'));
        } else {
            $this->Flash->error(__('The lista de produto could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
