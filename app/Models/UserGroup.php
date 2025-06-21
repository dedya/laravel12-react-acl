<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserGroup extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'is_active'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
