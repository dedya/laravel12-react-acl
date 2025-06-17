<?php
namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateUser implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $validated;
    protected $user;

    public function __construct(array $validated, ?User $user = null)
    {
        $this->validated = $validated;
        $this->user = $user;
    }

    public function handle()
    {
        // Handle photo removal
        if (!empty($this->validated['remove_photo']) && $this->user && $this->user->photo) {
            Storage::disk('public')->delete($this->user->photo);
            $this->user->photo = null;
        }

        // Handle password
        if (!empty($this->validated['password'])) {
            $this->validated['password'] = Hash::make($this->validated['password']);
        } else {
            unset($this->validated['password']);
        }

        //update user
        if ($this->user) {
            $this->user->update($this->validated);
            $this->user->syncRoles([$this->validated['role']]);
        } else {
            // create new user
            $user = User::create($this->validated);
            $user->assignRole($this->validated['role']);
        }
    }
}