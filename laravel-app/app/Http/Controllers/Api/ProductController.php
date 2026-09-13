<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;

class ProductController extends CrudController
{
    protected string $model = Product::class;
}
