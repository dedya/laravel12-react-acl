<?php
namespace App\Jobs;

use App\Models\UserGroup as Group;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateUserGroup implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $validated;
    protected $usergroup;

    public function __construct(array $validated, ?Group $usergroup = null)
    {
        $this->validated = $validated;
        $this->usergroup = $usergroup;
    }

    public function handle()
    {
        //update user group
        if ($this->usergroup) {
            $usergroup = $this->usergroup;
            $usergroup->update($this->validated);
        } else {
            // create new user
            $usergroup = Group::create($this->validated);
        }
    }
}