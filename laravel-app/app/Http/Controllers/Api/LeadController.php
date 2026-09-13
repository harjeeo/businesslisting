<?php

namespace App\Http\Controllers\Api;

use App\Models\Lead;

class LeadController extends CrudController
{
    protected string $model = Lead::class;
}
