<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
//use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Requests\RolePermissionRequest;
//use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Role;

class RolePermissionController extends BaseController
{

    function __construct() {
        //this permission checking for the controller, normally is done in BaseController
        //This is added also here, because the role name is different from the controller name
        //and the middleware is not able to match the controller name with the permission name
        //This is a workaround, but it works
        $this->middleware('permission:create-roles')->only('create', 'store', 'enable','disable');
        $this->middleware('permission:read-roles')->only('index','edit');
        $this->middleware('permission:update-roles')->only('update','enable','disable');
        $this->middleware('permission:delete-roles')->only('destroy');
    }

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

        return Inertia::render('Roles/PermissionMatrix', compact('role', 'all_permissions'));
    }

    //create a new record
    public function store(RolePermissionRequest $request)
    {
         $validated = $request->validated();

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')->with('success', __('general.data_is_created', ['name' => $validated['name']]));
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