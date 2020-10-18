<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class Initial extends AbstractMigration
{
    /**
     * Up Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-up-method
     * @return void
     */
    public function up()
    {
        $this->table('clientes')
            ->addColumn('nome', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('telefone', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('endereco', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->create();

        $this->table('lista_de_produtos')
            ->addColumn('pedido_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('produto_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('quantidade', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addIndex(
                [
                    'pedido_id',
                ]
            )
            ->addIndex(
                [
                    'produto_id',
                ]
            )
            ->create();

        $this->table('pedidos')
            ->addColumn('cliente_id', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('total', 'decimal', [
                'default' => '0',
                'null' => false,
                'precision' => 8,
                'scale' => 2,
            ])
            ->addColumn('status', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('created_at', 'timestamp', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addColumn('updated_at', 'timestamp', [
                'default' => null,
                'limit' => null,
                'null' => true,
            ])
            ->addIndex(
                [
                    'cliente_id',
                ]
            )
            ->create();

        $this->table('produtos')
            ->addColumn('codigo', 'integer', [
                'default' => null,
                'limit' => 10,
                'null' => false,
            ])
            ->addColumn('nome', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('descricao', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('preco', 'decimal', [
                'default' => null,
                'null' => false,
                'precision' => 8,
                'scale' => 2,
            ])
            ->create();

        $this->table('lista_de_produtos')
            ->addForeignKey(
                'pedido_id',
                'pedidos',
                'id',
                [
                    'update' => 'NO_ACTION',
                    'delete' => 'CASCADE',
                ]
            )
            ->addForeignKey(
                'produto_id',
                'produtos',
                'id',
                [
                    'update' => 'NO_ACTION',
                    'delete' => 'CASCADE',
                ]
            )
            ->update();

        $this->table('pedidos')
            ->addForeignKey(
                'cliente_id',
                'clientes',
                'id',
                [
                    'update' => 'NO_ACTION',
                    'delete' => 'CASCADE',
                ]
            )
            ->update();
    }

    /**
     * Down Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-down-method
     * @return void
     */
    public function down()
    {
        $this->table('lista_de_produtos')
            ->dropForeignKey(
                'pedido_id'
            )
            ->dropForeignKey(
                'produto_id'
            )->save();

        $this->table('pedidos')
            ->dropForeignKey(
                'cliente_id'
            )->save();

        $this->table('clientes')->drop()->save();
        $this->table('lista_de_produtos')->drop()->save();
        $this->table('pedidos')->drop()->save();
        $this->table('produtos')->drop()->save();
    }
}
