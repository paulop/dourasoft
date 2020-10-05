<?php 

    namespace App\Http\Controllers;

    use Illuminate\Support\Facades\DB;
    use Illuminate\Http\Request;
    use App\Models\Cliente;
    use App\Http\Requests\ClienteRequest;

    class ClienteController extends Controller
    {
        public function create(){
            return view('clientes.create');
        }

        public function store(Request $request){
            Cliente::create($request->all());
            $cliente = $request->nome;

            return redirect()->action('ClienteController@lista')->withInput($request->only('nome'));
        }

        public function storemodal(Request $request){
            $cliente = new Cliente;
            $cliente->nome = $request->nomecliente;
            $cliente->telefone = $request->telefonecliente;
            $cliente->endereco = $request->enderecocliente;

            $cliente->save();

            return "Cliente criado com sucesso";
        }
        

        public function lista(){
            //listagem dos clientes
            $clientes = DB::table('clientes')->simplePaginate(5);

            return view('clientes.list')->withClientes($clientes);
        }

        public function detalhes($id){
            //exibe detalhes do cliente
            $cliente = Cliente::find($id);

            return view('clientes.details')->withCliente($cliente);
        }

        public function delete($id){
            //exibe detalhes do cliente
            $cliente = Cliente::find($id);

            return view('clientes.delete')->withCliente($cliente);
        }

        public function destroy($id){
            $cliente = Cliente::find($id);

            $cliente->delete();

            return redirect()->action('ClienteController@lista');
        }

        public function editar($id){
            //enviar dados do cliente para edição
            $cliente = Cliente::find($id);

            return view('clientes.update')->withCliente($cliente);
        }

        public function update(Request $request, $id){

            $cliente = Cliente::find($id);

            $cliente->update([
                'nome' => $request->nome,
                'telefone' => $request->telefone,
                'endereco' => $request->endereco,
            ]);

            return redirect()->action('ClienteController@lista');
        }
    }
    
?>