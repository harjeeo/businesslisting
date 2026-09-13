<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'business',
        'customer',
        'rating',
        'comment',
        'status',
    ];
}
