<?php

namespace App\Http\Controllers\Api;

use App\Models\Business;

class BusinessController extends CrudController
{
    protected string $model = Business::class;
}
