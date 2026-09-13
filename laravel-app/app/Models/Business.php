<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'business_type',
        'category',
        'sub_category',
        'description',
        'established_year',
        'employees',
        'country',
        'state',
        'city',
        'address',
        'postal_code',
        'lat',
        'lng',
        'phone',
        'whatsapp',
        'email',
        'website',
        'logo_url',
        'cover_url',
        'gallery_urls',
        'video_url',
        'hours',
        'source',
        'source_url',
        'status',
        'leads',
        'joined',
    ];

    protected function casts(): array
    {
        return [
            'gallery_urls' => 'array',
            'joined' => 'datetime',
            'lat' => 'float',
            'lng' => 'float',
        ];
    }
}
