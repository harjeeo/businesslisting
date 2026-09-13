<?php

namespace App\Http\Controllers\Api;

use App\Models\Location;

class LocationController extends CrudController
{
    protected string $model = Location::class;
}
