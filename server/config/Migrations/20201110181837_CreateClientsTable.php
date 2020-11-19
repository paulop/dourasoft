<?php
use Migrations\AbstractMigration;

class CreateClientsTable extends AbstractMigration{
    function change()
    {
        $clientsTable = $this->table("clients");
        $clientsTable->addColumn("name", "string", [
            'default' => null,
            'limit' => 255,
            'null' => false,
        ]);
        $clientsTable->addColumn("address", "string", [
            'default' => null,
            'limit' => 255,
            'null' => false,
        ]);
        $clientsTable->addColumn("tel", "string", [
            'default' => null,
            'limit' => 255,
            "null" => true
        ]);
        $clientsTable->create();
    }
}

