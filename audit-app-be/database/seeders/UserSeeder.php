<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $loginableCount = 3;
        for ($i = 0; $i < $loginableCount; $i++) {
            User::factory()
                ->create([
                    'email' => 'user' . $i . '@trash-mail.com',
                    'password' => bcrypt('121212'),
                ]);
        }
        User::factory()
            ->count(20)
            ->create();
    }
}
