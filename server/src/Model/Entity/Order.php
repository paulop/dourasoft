<?php


namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\ORM\TableRegistry;

class Order extends Entity
{
    protected $_virtual = ['total'];

    protected function _getTotal()
    {
        $sum = 0;
        $products = TableRegistry::getTableLocator()
            ->get('OrderProducts')
            ->find("all")
            ->where(["order_id" => $this->id]);
        foreach ($products as $product)
            $sum += $product->quantity * $product->unit_value;
        return $sum;
    }
}
