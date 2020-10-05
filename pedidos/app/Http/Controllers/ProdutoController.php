<?php 
    namespace App\Http\Controllers;

    use Illuminate\Support\Facades\DB;
    use Illuminate\Http\Request;
    use App\Http\Requests\ProdutoRequest;
    use App\Models\Produto;

    class ProdutoController extends Controller
    {
        public function create(){
            return view('produtos.create');
        }

        public function store(ProdutoRequest $request){
            //dd($request->all());
            Produto::create($request->all());

            return redirect()->action('ProdutoController@lista')->withInput($request->only('nome'));
        }
        
        public function lista(){
            //listagem dos produtos
            $produtos = DB::table('produtos')->simplePaginate(5);

            return view('produtos.list')->withProdutos($produtos);
        }

        public function detalhes($id){
            //detalhes de um produto específico
            $produto = Produto::find($id);
            
            return view('produtos.details')->with('produto', $produto);

        }

        public function editar($id){
            //enviar dados do cliente para edição
            $produto = Produto::find($id);

            return view('produtos.update')->with('produto', $produto);
        }

        public function update(ProdutoRequest $request, $id){

            $produto = Produto::find($id);

            $produto->update($request->all());
            
            return redirect()->action('ProdutoController@lista');
        }

        public function delete($id){
            //produto
            $produto = Produto::find($id);

            return view('produtos.delete')->with('produto',$produto);
        }

        public function destroy($id){
            $produto = Produto::find($id);

            $produto->delete();

            $message = "Produto excluído com sucesso.";

            return redirect()->action('ProdutoController@lista');
        }
    }