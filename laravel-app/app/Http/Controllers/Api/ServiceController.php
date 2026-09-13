<?php

namespace App\Http\Controllers\Api;

use App\Models\Service;

class ServiceController extends CrudController
{
    protected string $model = Service::class;
}
