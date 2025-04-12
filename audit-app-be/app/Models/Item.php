<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    use HasUuids;

    protected $guarded = ['id'];
    protected $hidden = [
        'deleted_at',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
