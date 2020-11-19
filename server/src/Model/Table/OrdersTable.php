<?php


namespace App\Model\Table;

use Cake\ORM\Table;

class OrdersTable extends Table
{
    public function initialize(array $config)
    {
        $this->addBehavior("Timestamp", [
            'events' => [
                'Model.beforeSave' => [
                    'created_at' => 'new'
                ]
            ]
        ]);
        $this->belongsTo("Clients")
            ->setForeignKey("client_id")
            ->setProperty("client");

        $this->hasMany("OrderProducts")
            ->setForeignKey("order_id")
            ->setProperty("products")
            ->setDependent(true)
            ->setSaveStrategy("replace");
    }
}
