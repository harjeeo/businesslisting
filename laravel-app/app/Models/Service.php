<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'name',
        'business',
        'category',
        'price_from',
        'status',
    ];
}
