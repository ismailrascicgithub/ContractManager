<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\Contract::unguard();
        \App\Models\Contract::factory()->count(50)->create();
        \App\Models\Contract::reguard();
    }
}
