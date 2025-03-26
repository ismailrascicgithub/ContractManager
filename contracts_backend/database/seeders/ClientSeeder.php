<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\Client::unguard();

        \App\Models\Client::create(['name' => 'ABC Corporation']);
        \App\Models\Client::create(['name' => 'XYZ Industries']);
        \App\Models\Client::factory()->count(20)->create();

        \App\Models\Client::reguard();
    }
}
