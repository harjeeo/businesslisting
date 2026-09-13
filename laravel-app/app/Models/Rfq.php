<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rfq extends Model
{
    protected $fillable = [
        'product',
        'customer',
        'quantity',
        'budget',
        'quotes',
        'status',
    ];
}
