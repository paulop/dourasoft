<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //regras para o cliente
            'codigo' => 'required',
            'nome'=> 'required',
            'preco' => 'required'

        ];
    }

    public function messages(){
        return [
            'codigo.required'=> 'O campo Código é obrigatório.',
            'nome.required'=> 'O campo Nome é obrigatório.',
            'preco.required'=> 'O campo Preço é obrigatório.',
        ];
    }
    
}
