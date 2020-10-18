<?php
declare(strict_types=1);

use Migrations\AbstractSeed;

/**
 * Clientes seed.
 */
class ClientesSeed extends AbstractSeed
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
                'id' => 90,
                'nome' => 'Carlos Magno',
                'telefone' => '4533224455',
                'endereco' => 'Rua Paraná, 23. Maringá, PR',
            ],
            [
                'id' => 89,
                'nome' => 'Roberto Messias',
                'telefone' => '6799881122',
                'endereco' => 'Rua Aquidauana, 1100, dourados, MS',
            ],
            [
                'id' => 91,
                'nome' => 'Marcos Almeida',
                'telefone' => '6799774433',
                'endereco' => 'Rua das garças, 340. dourados,MS',
            ],
            [
                'id' => 92,
                'nome' => 'José Carlos',
                'telefone' => '1188773322',
                'endereco' => 'Rua Piaui, 75. São Paulo, SP',
            ],
            [
                'id' => 93,
                'nome' => 'Sandra Alencar',
                'telefone' => '6799995544',
                'endereco' => 'Rua Matogrosso, 750. Dourados, MS',
            ],
        ];

        $table = $this->table('clientes');
        $table->insert($data)->save();
    }
}
