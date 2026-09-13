<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

trait HasCamelCaseJson
{
    public function attributesToArray()
    {
        $attributes = parent::attributesToArray();

        $camelCased = [];
        foreach ($attributes as $key => $value) {
            $camelCased[Str::camel($key)] = $value;
        }

        return $camelCased;
    }
}
