<?php

use Migrations\AbstractMigration;

class CreateOrdersTable extends AbstractMigration
{
    function change()
    {
        $ordersTable = $this->table("orders");
        $ordersTable->addColumn("client_id", "integer", [
            'default' => null,
            'null' => false,
        ]);
        $ordersTable->addColumn("created_at", "timestamp", [
            'default' => null,
            'null' => false,
        ]);
        $ordersTable->addColumn("status", "string", [
            'default' => "Aberto",
            'limit' => 255,
            'null' => false
        ]);
        $ordersTable->create();
    }
}
