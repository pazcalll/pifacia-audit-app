<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admins/login', [AdminController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('admin')->group(function () {
        Route::get('/admins/profile', [AdminController::class, 'profile']);
        Route::delete('/admins/logout', [AdminController::class, 'logout']);
        Route::apiResource('items', ItemController::class)->only(['store', 'update', 'destroy']);
    });
    Route::middleware('user')->group(function () {
        Route::apiResource('invoices', InvoiceController::class);
    });
});

Route::apiResource('items', ItemController::class)->only(['index', 'show']);