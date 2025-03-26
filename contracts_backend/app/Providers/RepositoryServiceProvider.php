<?php

namespace App\Providers;

use App\Repositories\Contracts\ClientRepositoryInterface;
use App\Repositories\Contracts\ContractCommentRepositoryInterface;
use App\Repositories\Contracts\ContractRepositoryInterface;
use App\Repositories\Eloquent\EloquentClientRepository;
use App\Repositories\Eloquent\EloquentContractCommentRepository;
use App\Repositories\Eloquent\EloquentContractRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->bind(
            ClientRepositoryInterface::class,
            EloquentClientRepository::class
        );

        $this->app->bind(
            ContractRepositoryInterface::class,
            EloquentContractRepository::class
        );

        $this->app->bind(
            ContractCommentRepositoryInterface::class,
            EloquentContractCommentRepository::class
        );
    }
}
