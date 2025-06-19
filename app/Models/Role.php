<?php
namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Traits\LogsModelActivity;

class Role extends SpatieRole
{
    use SoftDeletes;
    use LogsModelActivity;

}
?>