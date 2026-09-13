<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'country',
        'state',
        'city',
        'businesses',
        'status',
    ];
}
