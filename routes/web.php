<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserGroupController;

Route::get('/', function () {
    /*return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
    */
    return redirect()->route(Auth::check() ? 'dashboard' : 'login');

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('users', UserController::class);
    Route::patch('/users/{user}/enable', [UserController::class, 'enable'])->name('users.enable');
    Route::patch('/users/{user}/disable', [UserController::class, 'disable'])->name('users.disable');

    Route::resource('roles', RoleController::class);
    Route::resource('usergroups', UserGroupController::class);
     Route::patch('/usergroups/{usergroup}/enable', [UserGroupController::class, 'enable'])->name('usergroups.enable');
    Route::patch('/usergroups/{usergroup}/disable', [UserGroupController::class, 'disable'])->name('usergroups.disable');

});

require __DIR__.'/auth.php';
