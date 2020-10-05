<?php 
    namespace App\Http\Controllers;

    use Illuminate\Support\Facades\DB;
    use Illuminate\Http\Request;
    use App\Models\Pedido;
    use App\Models\Produto;
    use App\Models\Cliente;
    use App\Models\ListaDeProdutos;

    class PedidoController extends Controller
    {
        public function create(){
            return view('pedidos.create');
        }

        public function store(Request $request){
            
            Pedido::create([
                'cliente_id' => $request->cliente_id,
                'total' => $request->total,
                'status' => $request->status,
            ]);

            $pedido_id = DB::getPdo()->lastInsertId();
            
            //verifica se há algum produto no pedido do cliente
            $array_produtoid = [];
            if(isset($request->id)){
                $array_produtoid = $request->id;
                $array_quantidade = $request->quantidade;
            }

            for($i = 0; $i < count($array_produtoid); $i++)
            {
                $lista_produtos = new ListaDeProdutos;
                $lista_produtos->pedido_id = $pedido_id;
                $lista_produtos->produto_id = $array_produtoid[$i];
                $lista_produtos->quantidade = $array_quantidade[$i];

                $lista_produtos->save();
            }
            
            return redirect()->action('PedidoController@lista')->withInput($request->only('cliente_id'));
        }
        
        public function lista(){
            //listagem dos pedidos
            $pedidos = DB::table('pedidos')->simplePaginate(5);

            return view('pedidos.list')->withPedidos($pedidos);
        }

        public function editar($id){
            //enviar dados do pedido para edição
            $pedido = Pedido::find($id);
            //buscar os itens da lista de produtos
            $lista_produtos = ListaDeProdutos::where('pedido_id',$id)->get();
            
            //buscar informações sobre os produtos da lista
            $produtos = [];
            for($i = 0; $i < count($lista_produtos); $i++){
                $produtos[$i] = Produto::find($lista_produtos[$i]->produto_id);
            }
            
            //enviar dados do cliente
            $cliente = Cliente::find($pedido->cliente_id);



            return view('pedidos.edit',['pedido' => $pedido, 'cliente' => $cliente,'lista_produtos' => $lista_produtos, 'produtos' => $produtos]);
        }

        public function detalhes($id){
            //enviar dados do pedido para edição
            $pedido = Pedido::find($id);
            //buscar os itens da lista de produtos
            $lista_produtos = ListaDeProdutos::where('pedido_id',$id)->get();
            
            //buscar informações sobre os produtos da lista
            $produtos = [];
            foreach($lista_produtos as $key => $value){
                $produtos[$key] = Produto::find($value->produto_id);
            }

            //enviar dados do cliente
            $cliente = Cliente::find($pedido->cliente_id);

            return view('pedidos.details',['pedido' => $pedido, 'cliente' => $cliente,'lista_produtos' => $lista_produtos, 'produtos' => $produtos]);
        }

        public function update(Request $request, $pedido_id){

            $pedido = Pedido::find($pedido_id);

            $pedido->update([
                'cliente_id' => $request->cliente_id,
                'total' => $request->total,
                'status' => $request->status,
            ]);
                        
            ListaDeProdutos::where('pedido_id', $pedido_id)->delete(); 
               
            //verifica se há algum produto no pedido do cliente
            $array_produtoid = [];
            if(isset($request->id)){
                $array_produtoid = $request->id;
                $array_quantidade = $request->quantidade;
            }
       
            for($i = 0; $i < count($array_produtoid); $i++)
            {
                $lista_produtos = new ListaDeProdutos;
                $lista_produtos->pedido_id = $pedido_id;
                $lista_produtos->produto_id = $array_produtoid[$i];
                $lista_produtos->quantidade = $array_quantidade[$i];

                $lista_produtos->save();
            }

            return redirect()->action('PedidoController@lista');
        }

        public function delete($id){
            //exibe detalhes do pedido
            $pedido = Pedido::find($id);

            $cliente = Cliente::find($pedido->cliente_id);

            return view('pedidos.delete', ['pedido' => $pedido, 'cliente' => $cliente]);
        }

        public function destroy($pedido_id){
            $pedido = Pedido::find($pedido_id);

            $pedido->delete();

            return redirect()->action('PedidoController@lista');
        }
    }