<?php

//namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Cliente;
use App\Models\Produto;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->call('ClienteTableSeeder');
        $this->call('ProdutoTableSeeder');
    }
}
class ClienteTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('clientes')->delete();

        Cliente::create(array('nome' => 'Carlos Santos', 'telefone' => '6798887766', 'endereco' => 'Rua dos Carlos, 100'));
        Cliente::create(array('nome' => 'Joaquim José', 'telefone' => '6798880000', 'endereco' => 'Rua dos Joaquins, 200'));
        Cliente::create(array('nome' => 'Silvio Santos', 'telefone' => '1198880066', 'endereco' => 'Rua dos milionários, 1000'));
        Cliente::create(array('nome' => 'Carlos Alberto', 'telefone' => '3398880000', 'endereco' => 'Rua dos Carlos, 2000'));
        Cliente::create(array('nome' => 'Ana Elizabeth', 'telefone' => '2198887799', 'endereco' => 'Rua das Flores, 2100'));
        Cliente::create(array('nome' => 'Maria Joaquina', 'telefone' => '2198889999', 'endereco' => 'Rua dos Jardins, 3200'));

    }

}

class ProdutoTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('produtos')->delete();

        Produto::create(array('codigo' => '1010', 'nome' => 'bateria de notebook', 'descricao' => 'bateria de notebook Sony', 'preco' => '500'));
        Produto::create(array('codigo' => '2020', 'nome' => 'monitor Led', 'descricao' => 'monitor led 21 polegadas', 'preco' => '1500'));
        Produto::create(array('codigo' => '1011', 'nome' => 'mouse usb', 'descricao' => 'mouse usb microsoft modelo m3', 'preco' => '100'));
        Produto::create(array('codigo' => '2021', 'nome' => 'mouse pad', 'descricao' => 'mouse pad technix', 'preco' => '30'));
        Produto::create(array('codigo' => '3000', 'nome' => 'pendrive 64GB', 'descricao' => 'pendrive kingston 64GB modelo st64', 'preco' => '90'));
        Produto::create(array('codigo' => '3010', 'nome' => 'pendrive 128GB', 'descricao' => 'pendrive kingston 128GB modelo st128', 'preco' => '150'));
        Produto::create(array('codigo' => '1515', 'nome' => 'teclado usb', 'descricao' => 'teclado abnt usb teknix modelo tc10', 'preco' => '40'));
        Produto::create(array('codigo' => '1818', 'nome' => 'teclado sem fio', 'descricao' => 'teclado sem fio microsoft tw1', 'preco' => '150'));
        Produto::create(array('codigo' => '1208', 'nome' => 'caixa de som usb', 'descricao' => 'caixa de som teknix modelo c33', 'preco' => '60'));
        Produto::create(array('codigo' => '0812', 'nome' => 'caixa de som jbl', 'descricao' => 'caixa de som bluetooth jbl mini', 'preco' => '180'));

    }

}
