<?php

namespace App\Models;

use App\Models\Concerns\HasCamelCaseJson;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasCamelCaseJson;

    protected $fillable = [
        'name',
        'email',
        'role',
        'country',
        'status',
        'joined',
    ];

    protected function casts(): array
    {
        return [
            'joined' => 'datetime',
        ];
    }
}
