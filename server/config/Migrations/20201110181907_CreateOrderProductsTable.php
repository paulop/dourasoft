<?php
use Migrations\AbstractMigration;

class CreateOrderProductsTable extends AbstractMigration{
    function change()
    {
        $orderProductsTable = $this->table("order_products");
        $orderProductsTable->addColumn("product_id", "integer", [
            'default' => null,
            'null' => false,
        ]);
        $orderProductsTable->addColumn("order_id", "integer", [
            'default' => null,
            'null' => false,
        ]);
        $orderProductsTable->addColumn("unit_value", "float", [
            'default' => null,
            'null' => false,
        ]);
        $orderProductsTable->addColumn("quantity", "integer", [
            'default' => null,
            'null' => false,
        ]);
        $orderProductsTable->create();
    }
}
