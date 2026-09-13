<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;

class CategoryController extends CrudController
{
    protected string $model = Category::class;
}
