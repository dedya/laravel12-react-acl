<?php

namespace App\Http\Controllers\Settings;

//use App\Abstracts\Http\Controller as BaseController;
use App\Http\Controllers\Controller as BaseController;
use Inertia\Inertia;

class SettingController extends BaseController
{
    public function construct() 
    {
        // Add CRUD permission check
        //$this->middleware('permission:read-settings-general')->only('edit');
        //$this->middleware('permission:update-settings-general')->only('update');
    }
    

    public function show() 
    {
        return $this->view();
    }

    public function view()
    {
        return Inertia::render('Settings/View');
    }
}