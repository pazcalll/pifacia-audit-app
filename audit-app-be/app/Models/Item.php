<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Item extends Model implements Auditable
{
    //
    use HasUuids,
        HasFactory,
        \OwenIt\Auditing\Auditable;

    protected $guarded = ['id'];
    protected $casts = [
        'active' => 'boolean',
    ];
    protected $hidden = [
        'deleted_at',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
