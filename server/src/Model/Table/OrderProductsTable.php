<?php


namespace App\Model\Table;


use Cake\ORM\Table;

class OrderProductsTable extends Table
{
    public function initialize(array $config)
    {
        parent::initialize($config);
        $this->belongsTo("Products")
            ->setForeignKey("product_id")
            ->setProperty("product");
    }

}
