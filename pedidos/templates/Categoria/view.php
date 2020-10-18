<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Categorium $categorium
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Categorium'), ['action' => 'edit', $categorium->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Categorium'), ['action' => 'delete', $categorium->id], ['confirm' => __('Are you sure you want to delete # {0}?', $categorium->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Categoria'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Categorium'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="categoria view content">
            <h3><?= h($categorium->id) ?></h3>
            <table>
                <tr>
                    <th><?= __('Descricao') ?></th>
                    <td><?= h($categorium->descricao) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($categorium->id) ?></td>
                </tr>
                <tr>
                    <th><?= __('Status') ?></th>
                    <td><?= $this->Number->format($categorium->status) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>
