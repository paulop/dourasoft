<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Produto[]|\Cake\Collection\CollectionInterface $produtos
 */
?>

<div class="modal fade" id="produtosModal" tabindex="-1" aria-labelledby="produtosModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="produtosModalLabel">Adicionar Produto ao Carrinho</h5>
        <input type="hidden" name="_csrfToken" value="<?= json_encode($this->request->getParam('_csrfToken')); ?>">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            
          </div>
          <div id="showproducts" class="form-group">
            
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
        <button id="modal-adicionarcarrinho" type="button" class="btn btn-success">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
</div>

<div class="">
    <p id="carrinho">Carrinho de Compras:</p>
</div>
<div class="produtos index content">
    <?= $this->Html->link(__('Novo Produto'), ['action' => 'add'], ['class' => 'btn-sm btn-success float-right']) ?>
    <h3><?= __('Produtos') ?></h3>
    
        <?php $i = 1; ?>
        <?php foreach($produtos as $produto): ?>
            
            <?php if($i == 1): ?>
                <div class="row">
            <?php endif; ?>
            <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 id="produto<?= $produto->id ?>nome" class="card-title border-bottom"><?= h($produto->nome) ?></h5>
                    <p class="card-text"><?= h($produto->descricao) ?></p>
                    <h6 id="produto<?= $produto->id ?>preco" class="card-text">R$<?= h($produto->preco) ?></h6>
                    <a id="btn-comprar" href="<?= ($produto->id) ?>" class="btn-sm btn-primary float-right">Comprar</a>
                </div>
                </div>
            </div>
            <?php if($i == 3): ?>
                </div><br/>
                <?php $i=0; ?>
            <?php endif; ?>
            <?php $i++; ?>
        <?php endforeach; ?>  
        
        <ul class="pagination">
            |<?= $this->Paginator->first('<< ' . __('primeiro')) ?>|
            <?= $this->Paginator->prev('< ' . __('anterior')) ?>|
            <?= $this->Paginator->numbers() ?>|
            <?= $this->Paginator->next(__('próximo') . ' >') ?>|
            <?= $this->Paginator->last(__('último') . ' >>') ?>|
        </ul>
        <p><?= $this->Paginator->counter(__('Página {{page}} de {{pages}}, mostrando {{current}} registros(s) de um total de {{count}}')) ?></p>
    
</div>
