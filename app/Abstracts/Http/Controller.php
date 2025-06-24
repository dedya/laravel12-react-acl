<?php

namespace App\Abstracts\Http;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Route;
use Illuminate\Support\Str;
use App\Traits\Jobs;

abstract class Controller extends BaseController
{
    use Jobs;
    /**
     * Instantiate a new controller instance.
     */
    public function __construct()
    {
        $this->assignPermissionsToController();
    }

    private function assignPermissionsToController()
    {
         // No need to check for permission in console
        if (app()->runningInConsole()) {
            return;
        }

        $route = app(Route::class);
        $arr = array_reverse(explode('\\', explode('@', $route->getAction()['uses'])[0]));
        $controller = Str::kebab($arr[0]);
        $controller = str_replace('-controller','',$controller);

        if (! str_ends_with($controller, "s")) {
            $controller.='s';
        }

        // Add CRUD permission check
        $this->middleware('permission:create-' . $controller)->only('create', 'store', 'duplicate', 'import');
        $this->middleware('permission:read-' . $controller)->only('index', 'show', 'edit', 'export');
        $this->middleware('permission:update-' . $controller)->only('update', 'enable', 'disable');
        $this->middleware('permission:delete-' . $controller)->only('destroy');
    }
}

