<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'client_id' => \App\Models\Client::inRandomOrder()->first()->id,
            'reference' => 'CONTRACT-' . fake()->unique()->numberBetween(1000, 9999),
            'start_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'duration' => fake()->numberBetween(6, 36),
            'value' => fake()->randomFloat(2, 1000, 1000000)
        ];
    }
}
