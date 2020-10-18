<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ListaDeProduto $listaDeProduto
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Lista De Produto'), ['action' => 'edit', $listaDeProduto->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Lista De Produto'), ['action' => 'delete', $listaDeProduto->id], ['confirm' => __('Are you sure you want to delete # {0}?', $listaDeProduto->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Lista De Produtos'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Lista De Produto'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="listaDeProdutos view content">
            <h3><?= h($listaDeProduto->id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Pedido') ?></th>
                    <td><?= $listaDeProduto->has('pedido') ? $this->Html->link($listaDeProduto->pedido->id, ['controller' => 'Pedidos', 'action' => 'view', $listaDeProduto->pedido->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Produto') ?></th>
                    <td><?= $listaDeProduto->has('produto') ? $this->Html->link($listaDeProduto->produto->id, ['controller' => 'Produtos', 'action' => 'view', $listaDeProduto->produto->id]) : '' ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($listaDeProduto->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Quantidade') ?></th>
                    <td><?= $this->Number->format($listaDeProduto->quantidade) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
