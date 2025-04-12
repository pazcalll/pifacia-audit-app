<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admins/login', [AdminController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admins/profile', [AdminController::class, 'profile']);
    Route::delete('/admins/logout', [AdminController::class, 'logout']);
    Route::apiResource('items', ItemController::class)->only(['store', 'update', 'destroy']);
});

Route::apiResource('items', ItemController::class)->only(['index', 'show']);