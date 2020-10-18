<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ListaDeProduto[]|\Cake\Collection\CollectionInterface $listaDeProdutos
 */
?>
<div class="listaDeProdutos index content">
    <?= $this->Html->link(__('New Lista De Produto'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Lista De Produtos') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('pedido_id') ?></th>
                    <th><?= $this->Paginator->sort('produto_id') ?></th>
                    <th><?= $this->Paginator->sort('quantidade') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($listaDeProdutos as $listaDeProduto): ?>
                <tr>
                    <td><?= $this->Number->format($listaDeProduto->id) ?></td>
                    <td><?= $listaDeProduto->has('pedido') ? $this->Html->link($listaDeProduto->pedido->id, ['controller' => 'Pedidos', 'action' => 'view', $listaDeProduto->pedido->id]) : '' ?></td>
                    <td><?= $listaDeProduto->has('produto') ? $this->Html->link($listaDeProduto->produto->id, ['controller' => 'Produtos', 'action' => 'view', $listaDeProduto->produto->id]) : '' ?></td>
                    <td><?= $this->Number->format($listaDeProduto->quantidade) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $listaDeProduto->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $listaDeProduto->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $listaDeProduto->id], ['confirm' => __('Are you sure you want to delete # {0}?', $listaDeProduto->id)]) ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) ?></p>
    </div>
</div>
