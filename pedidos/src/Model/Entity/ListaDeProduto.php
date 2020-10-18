<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ListaDeProduto Entity
 *
 * @property int $id
 * @property int $pedido_id
 * @property int $produto_id
 * @property int $quantidade
 *
 * @property \App\Model\Entity\Pedido $pedido
 * @property \App\Model\Entity\Produto $produto
 */
class ListaDeProduto extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'pedido_id' => true,
        'produto_id' => true,
        'quantidade' => true,
        'pedido' => true,
        'produto' => true,
    ];
}
