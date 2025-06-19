<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
//use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
//use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Role;

class RoleController extends BaseController
{

    //permission checking for the controller is done in BaseController
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return Inertia::render('Roles/Index', compact('roles'));
    }

    public function create()
    {
        return $this->form();
    }
    
    // Show the matrix for a specific role
    public function edit(Role $role)
    {
        return $this->form($role);
    }
    
    public function form(?Role $role = null)
    {
        if($role && $role->exists){
            $role->load('permissions');
        }
 
        $all_permissions = Permission::all();

        return Inertia::render('Roles/Form', compact('role', 'all_permissions'));
    }

    //create a new record
    public function store(RoleRequest $request)
    {
         $validated = $request->validated();

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')->with('success', __('general.data_is_created', ['name' => $validated['name']]));
    }

    //edit record
    public function update(RoleRequest $request, Role $role)
    {
        $validated = $request->validated();

        if (isset($validated['name'])) {
            $role->name = $validated['name'];
            $role->save();
        }
        $role->syncPermissions($request->permissions ?? []);
        return redirect()->route('roles.index')->with('success', __('general.data_is_updated', ['name' => $validated['name']]));   
    }

    public function destroy(Role $role)
    {
        $role->deleted_by = auth()->id();
        $role->save();
        $role->delete();
        return redirect()->route('roles.index')->with('success', __('general.data_is_deleted', ['name' => $role->name]));   
    }    

    
}