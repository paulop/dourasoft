<?php
use Migrations\AbstractMigration;

class CreateProductsTable extends AbstractMigration{
    function change()
    {
        $productsTable = $this->table("products");
        $productsTable->addColumn("name", "string", [
            'default' => null,
            'limit' => 255,
            'null' => false,
        ]);
        $productsTable->addColumn("code", "string", [
            'default' => null,
            'limit' => 255,
            'null' => false,
        ]);
        $productsTable->addColumn("price", "float", [
            'default' => null,
            'null' => false,
        ]);
        $productsTable->addColumn("description", "text", [
            'default' => null,
            'null' => true
        ]);
        $productsTable->create();
    }
}
