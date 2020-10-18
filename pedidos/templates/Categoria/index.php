<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Categorium[]|\Cake\Collection\CollectionInterface $categoria
 */
?>
<div class="categoria index content">
    <?= $this->Html->link(__('New Categorium'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Categoria') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('descricao') ?></th>
                    <th><?= $this->Paginator->sort('status') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($categoria as $categorium): ?>
                <tr>
                    <td><?= $this->Number->format($categorium->id) ?></td>
                    <td><?= h($categorium->descricao) ?></td>
                    <td><?= $this->Number->format($categorium->status) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $categorium->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $categorium->id]) ?>
                        <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $categorium->id], ['confirm' => __('Are you sure you want to delete # {0}?', $categorium->id)]) ?>
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
