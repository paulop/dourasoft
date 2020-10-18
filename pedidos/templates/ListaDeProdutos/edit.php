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
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $listaDeProduto->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $listaDeProduto->id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Lista De Produtos'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="listaDeProdutos form content">
            <?= $this->Form->create($listaDeProduto) ?>
            <fieldset>
                <legend><?= __('Edit Lista De Produto') ?></legend>
                <?php
                    echo $this->Form->control('pedido_id', ['options' => $pedidos]);
                    echo $this->Form->control('produto_id', ['options' => $produtos]);
                    echo $this->Form->control('quantidade');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
