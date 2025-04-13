<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users/register', [UserController::class, 'register']);
Route::post('/admins/login', [AdminController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('invoices', InvoiceController::class)->only(['index']);
    Route::middleware('admin')->group(function () {
        Route::get('/admins/profile', [AdminController::class, 'profile']);
        Route::delete('/admins/logout', [AdminController::class, 'logout']);
        Route::apiResource('items', ItemController::class)->only(['store', 'update', 'destroy']);
        Route::patch('users/{user}/restore', [UserController::class, 'restore']);
        Route::apiResource('users', UserController::class)->only(['index', 'destroy']);
    });
    Route::middleware('user')->group(function () {
        Route::patch('/users/profile', [UserController::class, 'updateProfile']);
        Route::get('/users/profile', [UserController::class, 'profile']);
        Route::delete('/users/logout', [UserController::class, 'logout']);
        Route::apiResource('invoices', InvoiceController::class)->except(['index']);
    });
});

Route::apiResource('items', ItemController::class)->only(['index', 'show']);