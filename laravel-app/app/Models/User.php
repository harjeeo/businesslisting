<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
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
