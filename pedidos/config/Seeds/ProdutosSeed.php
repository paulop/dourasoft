<?php
declare(strict_types=1);

use Migrations\AbstractSeed;

/**
 * Produtos seed.
 */
class ProdutosSeed extends AbstractSeed
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
                'id' => 42,
                'codigo' => 1,
                'nome' => 'mouse usb',
                'descricao' => 'mouse usb tektronics modelo mo-22',
                'preco' => '35.00',
            ],
            [
                'id' => 43,
                'codigo' => 2,
                'nome' => 'teclado usb',
                'descricao' => 'teclado usb tektronics modelo tc-33',
                'preco' => '45.50',
            ],
            [
                'id' => 44,
                'codigo' => 3,
                'nome' => 'hd ssd 120GB',
                'descricao' => 'hd ssd 120GB kingston modelo sd-120',
                'preco' => '300.00',
            ],
            [
                'id' => 45,
                'codigo' => 4,
                'nome' => 'monitor led 17',
                'descricao' => 'monitor led 17 polegadas LG modelo LG-172',
                'preco' => '999.90',
            ],
            [
                'id' => 46,
                'codigo' => 5,
                'nome' => 'fonde de ouvido',
                'descricao' => 'fone de ouvido jbl modelo jbl-3',
                'preco' => '65.00',
            ],
        ];

        $table = $this->table('produtos');
        $table->insert($data)->save();
    }
}
