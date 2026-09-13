<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'name',
        'parent',
        'businesses',
        'status',
    ];
}
