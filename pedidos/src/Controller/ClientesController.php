<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Clientes Controller
 *
 * @property \App\Model\Table\ClientesTable $Clientes
 * @method \App\Model\Entity\Cliente[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ClientesController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */

    public function initialize(): void
    {
        parent::initialize();

        $components = $this->loadComponent('RequestHandler');
    }


    public function index()
    {
        
        $clientes = $this->Clientes->find('all');
        $response = $this->response;
        $response = $response->withStringBody(json_encode($clientes));

        return $response;
    }

    public function search()
    {
        $response = $this->response;
        $busca = $this->request->getData('texto');
        if($busca != null){
            $clientes = $this->Clientes->find('all', array('conditions'=>array('LOWER(Clientes.nome) LIKE' => '%'.strtolower($busca).'%')));
            $response = $response->withStringBody(json_encode($clientes));
        }else{
            $response = $response->withStringBody('Erro na busca de cliente');
        }
        return $response;
    }

    /**
     * View method
     *
     * @param string|null $id Cliente id.
     * @return \Cake\Http\Response|null|void Renders view
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $cliente = $this->Clientes->get($id, [
            'contain' => [],
        ]);

        $this->set(compact('cliente'));
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
        $cliente = $this->Clientes->newEmptyEntity();
        if ($this->request->is('post')) {
            $cliente = $this->Clientes->patchEntity($cliente, $this->request->getData());
            if ($this->Clientes->save($cliente)) {
                $response = $response->withStringBody(json_encode($cliente));
            }else{
                $response = $response->withStringBody('Erro ao adicionar novo cliente');
            }
        }
        return $response;
    }

    /**
     * Edit method
     *
     * @param string|null $id Cliente id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições PATCH, POST e PUT');
        $cliente = $this->Clientes->get($id, [
            'contain' => [],
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $cliente = $this->Clientes->patchEntity($cliente, $this->request->getData());
            if ($this->Clientes->save($cliente)) {
                $response = $response->withStringBody('Dados do cliente atualizados');
            }else{
                $response = $response->withStringBody('Erro ao atualizar dados do cliente');
            }
        }
        return $response;
    }

    /**
     * Delete method
     *
     * @param string|null $id Cliente id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $response = $this->response;
        $response = $response->withStringBody('Esta rota só aceita requisições POST e DELETE');
        $this->request->allowMethod(['post', 'delete']);
        $cliente = $this->Clientes->get($id);
        if ($this->Clientes->delete($cliente)) {
            $response = $response->withStringBody('cliente removido');
        } else {
            $response = $response->withStringBody('Erro ao remover cliente');

        }
        return $response;
    }
}
