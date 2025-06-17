<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class DeleteUser implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $deletedBy;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user, $deletedBy = null)
    {
        $this->user = $user;
        $this->deletedBy = $deletedBy;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->user->photo) {
            Storage::disk('public')->delete($this->user->photo);
        }

        $this->user->deleted_by = $this->deletedBy;
        $this->user->save();
        $this->user->delete(); // this will set deleted_at
  }
}
