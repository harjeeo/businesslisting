<?php

namespace App\Http\Controllers\Api;

use App\Models\Review;

class ReviewController extends CrudController
{
    protected string $model = Review::class;
}
