<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\User::unguard();

        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        \App\Models\User::create([
            'name' => 'Viewer',
            'email' => 'viewer@example.com',
            'password' => bcrypt('password'),
            'role' => 'viewer'
        ]);

        \App\Models\User::factory()->count(10)->create();

        \App\Models\User::reguard();
    }
}
