<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
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

    Route::prefix('settings')->as('settings.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Settings\SettingController::class, 'show'])->name('main');

        Route::get('/general', [\App\Http\Controllers\Settings\GeneralSettingController::class, 'edit'])->name('general.edit');
        Route::put('/general', [\App\Http\Controllers\Settings\GeneralSettingController::class, 'update'])->name('general.update');
    });

    //artisan commands
    Route::get('/artisan/{command}', function ($command) {
        try {
            $allowed = [
                'cache:clear',
                'config:clear',
                'route:clear',
                'view:clear',
                'migrate',
                'optimize',
            ];

            if (!in_array($command, $allowed)) {
                abort(403, 'Command not allowed');
            }
            Artisan::call($command);
            return Artisan::output();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    })->name('artisan.command');

        
});


require __DIR__.'/auth.php';

/**
 * Explorer admin template
 */
Route::prefix('tailadmin')->name('tailadmin.')->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('TailAdmin/Dashboard');
    })->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('TailAdmin/Profile');
    })->name('profile');

    Route::get('/calendar', function () {
        return Inertia::render('TailAdmin/Calendar');
    })->name('calendar');

    Route::get('/form', function () {
        return Inertia::render('TailAdmin/Form');
    })->name('form');

    Route::get('/table', function () {
        return Inertia::render('TailAdmin/Table');
    })->name('table');

    Route::get('/blank', function () {
        return Inertia::render('TailAdmin/Blank');
    })->name('blank');

    Route::get('/404', function () {
        return Inertia::render('TailAdmin/Error/Error404');
    })->name('404');

    Route::get('/chart/line', function () {
        return Inertia::render('TailAdmin/Chart/Line');
    })->name('chart.line');

    Route::get('/chart/bar', function () {
        return Inertia::render('TailAdmin/Chart/Bar');
    })->name('chart.bar');

    Route::get('/ui/alert', function () {
        return Inertia::render('TailAdmin/UI/Alert');
    })->name('ui.alert');

    Route::get('/ui/avatars', function () {
        return Inertia::render('TailAdmin/UI/Avatars');
    })->name('ui.avatars');

    Route::get('/ui/badge', function () {
        return Inertia::render('TailAdmin/UI/Badge');
    })->name('ui.badge');

    Route::get('/ui/buttons', function () {
        return Inertia::render('TailAdmin/UI/Buttons');
    })->name('ui.buttons');

    Route::get('/ui/images', function () {
        return Inertia::render('TailAdmin/UI/Images');
    })->name('ui.images');

    Route::get('/ui/videos', function () {
        return Inertia::render('TailAdmin/UI/Videos');
    })->name('ui.videos');

    Route::get('/signup', function () {
        return Inertia::render('TailAdmin/Auth/Signup');
    })->name('signup');

    Route::get('/signin', function () {
        return Inertia::render('TailAdmin/Auth/Signin');
    })->name('signin');
});