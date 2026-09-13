<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'name',
        'business',
        'category',
        'price',
        'status',
    ];
}
