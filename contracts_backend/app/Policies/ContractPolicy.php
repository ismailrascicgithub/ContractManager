<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Contract;

class ContractPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isViewer();
    }

    public function view(User $user, Contract $contract): bool
    {
        return $user->isAdmin() || $user->isViewer();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Contract $contract): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Contract $contract): bool
    {
        return $user->isAdmin();
    }
}