<?php

use App\Http\Controllers\Storefront\BusinessController;
use App\Http\Controllers\Storefront\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/business/{slug}', [BusinessController::class, 'show'])->name('businesses.show');
Route::post('/business/{slug}/enquire', [BusinessController::class, 'enquire'])->name('businesses.enquire');
