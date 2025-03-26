<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\Contract;
use App\Models\ContractComment;
use App\Policies\ClientPolicy;
use App\Policies\ContractCommentPolicy;
use App\Policies\ContractPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Client::class => ClientPolicy::class,
        Contract::class => ContractPolicy::class,
        ContractComment::class => ContractCommentPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('is-admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('is-viewer', function ($user) {
            return $user->role === 'viewer';
        });

    }
}