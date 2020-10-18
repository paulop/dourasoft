<?php
declare(strict_types=1);

namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ListaDeProdutosTable;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ListaDeProdutosTable Test Case
 */
class ListaDeProdutosTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ListaDeProdutosTable
     */
    protected $ListaDeProdutos;

    /**
     * Fixtures
     *
     * @var array
     */
    protected $fixtures = [
        'app.ListaDeProdutos',
        'app.Pedidos',
        'app.Produtos',
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $config = $this->getTableLocator()->exists('ListaDeProdutos') ? [] : ['className' => ListaDeProdutosTable::class];
        $this->ListaDeProdutos = $this->getTableLocator()->get('ListaDeProdutos', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown(): void
    {
        unset($this->ListaDeProdutos);

        parent::tearDown();
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules(): void
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
