<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\LogsModelActivity;
use App\Traits\Blameable;

class UserGroup extends Model
{
    use LogsModelActivity;
    use Blameable;
    
    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
