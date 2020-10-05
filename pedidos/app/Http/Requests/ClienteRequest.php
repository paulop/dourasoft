<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClienteRequest extends FormRequest
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
            'nome' => 'required',
            'telefone'=> 'required',
            'endereco' => 'required'
        ];
    }

    public function messages(){
        return [
            'nome.required'=> 'O campo Nome é obrigatório.',
            'telefone.required'=> 'O campo Telefone é obrigatório.',
            'endereco.required'=> 'O campo Endereço é obrigatório.',
        ];
    }
}
