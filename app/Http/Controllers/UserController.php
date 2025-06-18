<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\UserGroup as Group; 
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Jobs\UpdateUser;
use App\Jobs\DeleteUser;

//use Illuminate\Routing\Controller as BaseController;
use App\Abstracts\Http\Controller as BaseController;

class UserController extends BaseController
{

    //permission checking for the controller is done in BaseController
    public function index(Request $request)
    {
        Log::info('USER LIST');

         $query = User::with('roles:id,name')->select('id', 'name', 'email','is_active','photo');

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
        
        $users = $query->paginate(10)->withQueryString();
        $filters = $request->only(['name', 'email']);
        return Inertia::render('Users/Index', compact('users', 'filters'));
    }

    public function create()
    {
        return $this->form(); // Call form method to render the form with roles and groups
    }

    public function edit(User $user)
    {
        return $this->form($user);
    }

    public function form(?User $user = null)
    {
        $roles = Role::all(); // Fetch all roles using Spatie
        $groups = Group::all(); // Fetch groups
        if ($user && $user->exists) { 
            $user->load(['roles','userGroup']); // Load roles and group relationships
        } else {
            $user = null;
        }

        return Inertia::render('Users/Form', compact('user', 'roles', 'groups'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        return $this->saveUser($request);
    }

    public function update(UserRequest $request, User $user)
    {
        return $this->saveUser($request, $user);
    }
 
    private function saveUser(UserRequest $request, ?User $user = null)
    {
        $validated = $request->validated();

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('photos', 'public');
        }

        try {
            (new UpdateUser($validated, $user))->handle();
            $messageKey = $user ? 'data_is_updated' : 'data_is_created';
            $name = $user ? $user->name : $validated['name'];
            $message = __('general.' . $messageKey, ['name' => $name]);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return redirect()->route('users.index')->with('error', $message);
        }

        return redirect()->route('users.index')->with('success', $message);
    }

    public function destroy(User $user)
    {
        (new DeleteUser($user, auth()->id()))->handle();
        $message = __('general.data_is_deleted', ['name' => $user->name]);
        return redirect()->route('users.index')->with('success', $message);
    }

    public function enable(Request $request, User $user)
    {
        return $this->setActive($request, $user, true);
    }
    
    public function disable(Request $request, User $user)
    {
        return $this->setActive($request, $user, false);
    }

    private function setActive(Request $request, User $user, $active = true)
    {
        $user->is_active = $active;
        $user->save();

        // get filter and page from requst, then redirect it with query string
        $query = $request->only(['name', 'email', 'page']);

        if($active)
            $message = __('general.set_enabled', ['name' => $user->name]);
        else
            $message = __('general.set_disabled', ['name' => $user->name]);

        Log::info('ENABLE USER', ['id' => $user->id, 'query' => $query]);
        return redirect()->route('users.index', $query)->with('success',$message);
    }
}
