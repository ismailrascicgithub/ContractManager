<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractCommentController;
use App\Http\Controllers\ContractController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth'); 

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::middleware(['auth'])->group(function () {
    Route::get('/clients', [ClientController::class, 'index']);
    Route::get('/clients/{client}', [ClientController::class, 'show']);
    Route::get('/contracts', [ContractController::class, 'index']);
    Route::get('/contracts/{contract}', [ContractController::class, 'show']);
    Route::get('/contracts/{contract}/comments', [ContractCommentController::class, 'index']);
});

Route::middleware(['auth', 'can:is-admin'])->group(function () {
    Route::apiResource('clients', ClientController::class)->except(['index', 'show']);
    Route::apiResource('contracts', ContractController::class)->except(['index', 'show']);
    Route::post('/contracts/generate-reference', [ContractController::class, 'generateReference']);

    Route::post('/contracts/{contract}/comments', [ContractCommentController::class, 'store']);
    Route::put('/comments/{comment}', [ContractCommentController::class, 'update']);
    Route::delete('/comments/{comment}', [ContractCommentController::class, 'destroy']);
});
