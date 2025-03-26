<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContractComment>
 */
class ContractCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'contract_id' => \App\Models\Contract::inRandomOrder()->first()->id,
            'comment' => fake()->paragraph(),
            'created_by' => \App\Models\User::inRandomOrder()->first()->id
        ];
    }
}
