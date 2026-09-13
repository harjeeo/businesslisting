<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'business',
        'customer',
        'interest',
        'status',
    ];
}
