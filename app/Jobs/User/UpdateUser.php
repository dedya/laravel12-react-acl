<?php

namespace App\Jobs\User;

use App\Abstracts\Job;
use App\Interfaces\Job\ShouldUpdate;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateUser extends Job implements ShouldUpdate
{
    public function handle() : User
    {
        
        // Do not reset password if not entered/changed
        if (empty($this->request['password'])) {
            unset($this->request['change_password']);
            unset($this->request['current_password']);
            unset($this->request['password']);
            unset($this->request['password_confirmation']);
        }

        logger("User update related tasks processed for user ID: " . $this->model->id);

        DB::transaction(function() {
            $this->model->update($this->request->all());
            $this->model->syncRoles([$this->request['role']]);

            
        });

        return $this->model;
    }
}