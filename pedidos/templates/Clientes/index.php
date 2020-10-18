<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Cliente[]|\Cake\Collection\CollectionInterface $clientes
 */
?>
<div class="clientes index content">
    <?= $this->Html->link(__('Novo Cliente'), ['action' => 'add'], ['class' => 'btn btn-success float-right']) ?>
    <h3><?= __('Clientes') ?></h3>
    <div class="">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col"><?= $this->Paginator->sort('nome') ?></th>
                    <th scope="col"><?= $this->Paginator->sort('telefone') ?></th>
                    <th scope="col"><?= $this->Paginator->sort('endereco') ?></th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($clientes as $cliente): ?>
                <tr>
                    <td><?= h($cliente->nome) ?></td>
                    <td><?= h($cliente->telefone) ?></td>
                    <td><?= h($cliente->endereco) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('Ver'), ['action' => 'view', $cliente->id], ['class' => 'btn-sm btn-primary']) ?>
                        <?= $this->Html->link(__('Editar'), ['action' => 'edit', $cliente->id], ['class' => 'btn-sm btn-success']) ?>
                        <?= $this->Form->postLink(__('Excluir'), ['action' => 'delete', $cliente->id], ['class' => 'btn-sm btn-danger'], ['confirm' => __('Are you sure you want to delete # {0}?', $cliente->id)]) ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php 
       
    ?>
    <div class="pagination">
        <ul class="pagination">
            |<?= $this->Paginator->first('<< ' . __('primeira')) ?>|
            <?= $this->Paginator->prev('< ' . __('anterior')) ?>|
            <?= $this->Paginator->numbers() ?>|
            <?= $this->Paginator->next(__('próxima') . ' >') ?>|
            <?= $this->Paginator->last(__('última') . ' >>') ?>|
        </ul>
        <p><?= $this->Paginator->counter(__('Página {{page}} de {{pages}}, mostrando {{current}} registro(s) de um total de {{count}}.')) ?></p>
    </div>
</div>
