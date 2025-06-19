<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Abstracts\Http\Controller as BaseController;
use App\Models\UserGroup as Group; 
use App\Jobs\UpdateUserGroup;
use App\Jobs\DeleteUserGroup;
use App\Models\UserGroup;
use Inertia\Inertia;


class UserGroupController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::paginate(10)->withQueryString();
        return Inertia::render('UserGroups/Index', compact('groups'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserGroup $usergroup)
    {
        (new DeleteUserGroup($usergroup, auth()->id()))->handle();
        $message = __('general.data_is_deleted', ['name' => $usergroup->name]);
        return redirect()->route('usergroups.index')->with('success', $message);
    }

    public function enable(Request $request, UserGroup $usergroup)
    {
        return $this->setActive($request, $usergroup, true);
    }
    
    public function disable(Request $request, UserGroup $usergroup)
    {
        return $this->setActive($request, $usergroup, false);
    }

    private function setActive($request,$usergroup, $active)
    {
        $usergroup->is_active = $active;
        $usergroup->save();

        // get filter and page from requst, then redirect it with query string
        $query = $request->only(['name', 'email', 'page']);

        if($active)
            $message = __('general.set_enabled', ['name' => $usergroup->name]);
        else
            $message = __('general.set_disabled', ['name' => $usergroup->name]);

        return redirect()->route('usergroups.index', $query)->with('success',$message);
    }
}
