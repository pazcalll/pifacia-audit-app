<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admins/login', [AdminController::class, 'login']);
Route::delete('/admins/logout', [AdminController::class, 'logout'])->middleware('auth:sanctum');