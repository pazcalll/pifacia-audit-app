<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\AdminFactory> */
    use HasApiTokens, HasFactory, HasUuids;

    final const ROLE_ADMINISTRATOR = 'administrator';
    final const ROLES = [
        self::ROLE_ADMINISTRATOR,
    ];

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token',
        'deleted_at',
    ];
}
