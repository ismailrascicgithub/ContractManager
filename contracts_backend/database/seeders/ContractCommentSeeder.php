<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContractCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\ContractComment::unguard();
        \App\Models\ContractComment::factory()->count(200)->create();
        \App\Models\ContractComment::reguard();
    }
}
