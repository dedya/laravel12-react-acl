<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Requests\RolePermissionRequest;
use Illuminate\Routing\Controller as BaseController;

class RolePermissionController extends BaseController
{

    function __construct() {
        $this->middleware('permission:create-role')->only('create', 'store', 'enable','disable');
        $this->middleware('permission:read-role')->only('index','edit');
        $this->middleware('permission:update-role')->only('update','enable','disable');
        $this->middleware('permission:delete-role')->only('destroy');
    }

    public function index()
    {

        return Inertia::render('Roles/Index', [
            'roles' => Role::with('permissions')->get(),
        ]);
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully.');
    }    

    public function create()
    {
         return Inertia::render('Roles/PermissionMatrix', [
            'all_permissions' => Permission::all(),
        ]);
    }
    
    // Show the matrix for a specific role
    public function edit(Role $role)
    {
        $role->load('permissions');
        return Inertia::render('Roles/PermissionMatrix', [
            'role' => $role,
            'all_permissions' => Permission::all()
        ]);
    }
    
    //create a new record
    public function store(RolePermissionRequest $request)
    {
         $validated = $request->validated();

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }

    //edit record
    public function update(RolePermissionRequest $request, Role $role)
    {
        $validated = $request->validated();

        if (isset($validated['name'])) {
            $role->name = $validated['name'];
            $role->save();
        }
        $role->syncPermissions($request->permissions ?? []);
        return redirect()->route('roles.index')->with('success', 'Permissions updated.');
    }

 
}