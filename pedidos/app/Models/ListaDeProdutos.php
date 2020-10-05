<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListaDeProdutos extends Model
{
    public $timestamps = false;
    protected $fillable = ['pedido_id', 'produto_id', 'quantidade'];
}
