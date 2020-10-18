<?php
declare(strict_types=1);

use Migrations\AbstractSeed;

/**
 * Pedidos seed.
 */
class PedidosSeed extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeds is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 21,
                'cliente_id' => 89,
                'total' => '45.50',
                'status' => 'A',
                'created_at' => '2020-10-17 23:13:46',
                'updated_at' => '2020-10-17 23:37:37',
            ],
            [
                'id' => 22,
                'cliente_id' => 90,
                'total' => '45.50',
                'status' => 'A',
                'created_at' => '2020-10-17 23:33:07',
                'updated_at' => '2020-10-18 01:22:54',
            ],
            [
                'id' => 23,
                'cliente_id' => 93,
                'total' => '300.00',
                'status' => 'A',
                'created_at' => '2020-10-18 01:29:40',
                'updated_at' => '2020-10-18 01:36:23',
            ],
            [
                'id' => 24,
                'cliente_id' => 91,
                'total' => '380.50',
                'status' => 'E',
                'created_at' => '2020-10-18 01:36:48',
                'updated_at' => '2020-10-18 01:36:48',
            ],
        ];

        $table = $this->table('pedidos');
        $table->insert($data)->save();
    }
}
