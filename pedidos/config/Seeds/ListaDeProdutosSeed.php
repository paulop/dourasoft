<?php
declare(strict_types=1);

use Migrations\AbstractSeed;

/**
 * ListaDeProdutos seed.
 */
class ListaDeProdutosSeed extends AbstractSeed
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
                'id' => 108,
                'pedido_id' => 23,
                'produto_id' => 44,
                'quantidade' => 1,
            ],
            [
                'id' => 109,
                'pedido_id' => 24,
                'produto_id' => 42,
                'quantidade' => 1,
            ],
            [
                'id' => 110,
                'pedido_id' => 24,
                'produto_id' => 43,
                'quantidade' => 1,
            ],
            [
                'id' => 111,
                'pedido_id' => 24,
                'produto_id' => 44,
                'quantidade' => 1,
            ],
            [
                'id' => 96,
                'pedido_id' => 21,
                'produto_id' => 43,
                'quantidade' => 1,
            ],
            [
                'id' => 106,
                'pedido_id' => 22,
                'produto_id' => 43,
                'quantidade' => 1,
            ],
        ];

        $table = $this->table('lista_de_produtos');
        $table->insert($data)->save();
    }
}
