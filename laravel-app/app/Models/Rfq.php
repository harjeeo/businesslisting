<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Rfq extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'product',
        'customer',
        'quantity',
        'budget',
        'quotes',
        'status',
    ];
}
