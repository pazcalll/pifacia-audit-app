<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Admin::create([
            'name' => 'Administrator',
            'role' => Admin::ROLE_ADMINISTRATOR,
            'email' => 'admin@trash-mail.com',
            'password' => bcrypt('121212'),
            'remember_token' => null,
        ]);
    }
}
