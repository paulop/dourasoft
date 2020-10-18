<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Pedidos Controller
 *
 * @property \App\Model\Table\PedidosTable $Pedidos
 * @method \App\Model\Entity\Pedido[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class PedidosController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        $pedidos = $this->paginate($this->Pedidos, ['contain' => ['Clientes', 'ListaDeProdutos']]);

        //$this->set(compact('pedidos'));
        //$pedidos = $this->Pedidos->find('all');
        $response = $this->response;
        $response = $response->withStringBody(json_encode($pedidos));

        return $response;
    }

    /**
     * View method
     *
     * @param string|null $id Pedido id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $pedido = $this->Pedidos->get($id, [
            'contain' => [],
        ]);

        $this->set(compact('pedido'));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $response = $this->response;
        $pedido = $this->Pedidos->newEmptyEntity();
        if ($this->request->is('post')) {
            $pedido = $this->Pedidos->patchEntity($pedido, $this->request->getData());
            if ($this->Pedidos->save($pedido)) {
                //$this->Flash->success(__('The pedido has been saved.'));
                $response = $response->withStringBody('Novo pedido criado.');

                //return $this->redirect(['action' => 'index']);
            }else{
                $response = $response->withStringBody('Erro ao criar novo pedido');
            }
            //$this->Flash->error(__('The pedido could not be saved. Please, try again.'));
        }
        //$this->set(compact('pedido'));
        return $response;
    }

    /**
     * Edit method
     *
     * @param string|null $id Pedido id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        
        $response = $this->response;
        $pedido = $this->Pedidos->get($id, [
            'contain' => ['ListaDeProdutos'],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $pedido = $this->Pedidos->patchEntity($pedido, $this->request->getData());
            if ($this->Pedidos->save($pedido)) {
                //$this->Flash->success(__('The pedido has been saved.'));

                //return $this->redirect(['action' => 'index']);
                $response = $response->withStringBody('Dados do pedido atualizados');

            }else{
                $response = $response->withStringBody('Erro ao atualizar dados do pedido');
            }
        }
        //$this->set(compact('pedido'));
        return $response;
    }

    /**
     * Delete method
     *
     * @param string|null $id Pedido id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições POST e DELETE');
        $this->request->allowMethod(['post', 'delete']);
        $pedido = $this->Pedidos->get($id);
        if ($this->Pedidos->delete($pedido)) {
            $response = $response->withStringBody('Pedido removido');
        } else {
            $response = $response->withStringBody('Erro ao remover o pedido');
        }

        return $response;

    }
}
