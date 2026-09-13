<?php

use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BusinessController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ImportController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\RfqController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/public/businesses', [PublicController::class, 'businesses']);
Route::get('/public/businesses/{slug}', [PublicController::class, 'businessBySlug']);
Route::get('/public/categories', [PublicController::class, 'categories']);
Route::get('/public/locations', [PublicController::class, 'locations']);

Route::middleware('import.key')->post('/import/gmb', [ImportController::class, 'gmb']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::apiResource('businesses', BusinessController::class)->except(['show'])->parameters(['businesses' => 'id']);
    Route::get('/businesses/{id}', [BusinessController::class, 'show']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users/{id}/toggle-block', [UserController::class, 'toggleBlock']);

    Route::apiResource('categories', CategoryController::class)->except(['show'])->parameters(['categories' => 'id']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);

    Route::apiResource('locations', LocationController::class)->except(['show'])->parameters(['locations' => 'id']);
    Route::get('/locations/{id}', [LocationController::class, 'show']);

    Route::get('/admin-users', [AdminUserController::class, 'index']);
    Route::get('/admin-users/{id}', [AdminUserController::class, 'show']);
    Route::post('/admin-users', [AdminUserController::class, 'store']);
    Route::put('/admin-users/{id}', [AdminUserController::class, 'update']);
    Route::delete('/admin-users/{id}', [AdminUserController::class, 'destroy']);

    Route::apiResource('products', ProductController::class)->except(['show'])->parameters(['products' => 'id']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    Route::apiResource('services', ServiceController::class)->except(['show'])->parameters(['services' => 'id']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);

    Route::apiResource('leads', LeadController::class)->except(['show'])->parameters(['leads' => 'id']);
    Route::get('/leads/{id}', [LeadController::class, 'show']);

    Route::apiResource('rfqs', RfqController::class)->except(['show'])->parameters(['rfqs' => 'id']);
    Route::get('/rfqs/{id}', [RfqController::class, 'show']);

    Route::apiResource('reviews', ReviewController::class)->except(['show'])->parameters(['reviews' => 'id']);
    Route::get('/reviews/{id}', [ReviewController::class, 'show']);
});
