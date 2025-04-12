<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/admins/login', [AdminController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admins/profile', [AdminController::class, 'profile']);
    Route::delete('/admins/logout', [AdminController::class, 'logout']);
});