<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Produto;
use App\Models\Cliente;


class PesquisaController extends Controller
{
    public function clientes(Request $request)
    {
        //listagem dos clientes
        $clientes = Cliente::where('nome', 'ilike','%'.$request->input('cliente').'%')->get();

        return response()->json($clientes);
    }

    public function produtos(Request $request)
    {
        //listagem dos produtos
        $produtos = Produto::where('nome', 'ilike','%'.$request->input('produto').'%')->get();

        return response()->json($produtos);
    }

    public function detalhes($id){
        //detalhes de um produto específico
        
        $produto = DB::select('select * from produtos where id = ?', [$id]);
        
        return response()->json($produto);
        

    }
}
