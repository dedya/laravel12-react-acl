<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Abstracts\Http\Controller as BaseController;
use App\Models\UserGroup as Group; 
use Inertia\Inertia;
use App\Http\Requests\UserGroupRequest;
use App\Services\UserGroupService;

class UserGroupController extends BaseController
{
    private UserGroupService $userGroupService;

    public function __construct(UserGroupService $userGroupService)
    {
        $this->userGroupService = $userGroupService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::paginate(10)->withQueryString();
        return Inertia::render('UserGroups/Index', compact('groups'));
    }

     public function create()
    {
        return $this->form(); // Call form method to render the form with roles and groups
    }

    public function edit(Group $usergroup)
    {
        return $this->form($usergroup);
    }

    public function form(?Group $usergroup = null)
    {
        return Inertia::render('UserGroups/Form', compact('usergroup'));
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(UserGroupRequest $request)
    {
        return $this->saveUserGroup($request);
    }

    public function update(UserGroupRequest $request, Group $usergroup)
    {
        return $this->saveUserGroup($request, $usergroup);
    }
 
    private function saveUserGroup($request, ?Group $usergroup = null)
    {
        $validated = $request->validated();
    
        try {
            $savedGroup = $this->userGroupService->save($validated, $usergroup);

            $messageKey = $usergroup ? 'data_is_updated' : 'data_is_created';
            $name = $savedGroup->name;
            $message = __('general.' . $messageKey, ['name' => $name]);
            
            return redirect()->route('usergroups.index')->with('success', $message);

        } catch (\Exception $e) {
            return redirect()->route('usergroups.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $usergroup)
    {
        try {
            $this->userGroupService->delete($usergroup, auth()->id());
                
            $message =  __('general.data_is_deleted', ['name' => $usergroup->name]);

            return back()->with('success',$message);
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function enable(Request $request, Group $usergroup)
    {
        return $this->setActive($request, $usergroup, true);
    }
    
    public function disable(Request $request, Group $usergroup)
    {
        return $this->setActive($request, $usergroup, false);
    }

    private function setActive($request,$usergroup, $active)
    {
        try {
            $this->userGroupService->setActive($usergroup, $active);

            // get page from requst, then redirect it with query string
            $query = $request->only(['page']);

            if($active)
                $message = __('general.set_enabled', ['name' => $usergroup->name]);
            else
                $message = __('general.set_disabled', ['name' => $usergroup->name]);

            return redirect()->route('usergroups.index', $query)->with('success',$message);

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
