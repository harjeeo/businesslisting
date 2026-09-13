<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class AdminUser extends Model
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password_hash',
        'role',
        'status',
        'last_active',
    ];

    protected $hidden = [
        'password_hash',
    ];

    protected function casts(): array
    {
        return [
            'last_active' => 'datetime',
        ];
    }
}
