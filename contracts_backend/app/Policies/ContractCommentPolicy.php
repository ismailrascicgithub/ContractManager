<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ContractComment;

class ContractCommentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isViewer();
    }

    public function view(User $user, ContractComment $comment): bool
    {
        return $user->isAdmin() || $user->isViewer();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, ContractComment $comment): bool
    {
        return $user->isAdmin() || ($user->isViewer() && $comment->user_id === $user->id);
    }

    public function delete(User $user, ContractComment $comment): bool
    {
        return $user->isAdmin();
    }
}