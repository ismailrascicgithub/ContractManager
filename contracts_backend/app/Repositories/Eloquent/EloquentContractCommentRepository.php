<?php

namespace App\Repositories\Eloquent;

use App\Models\ContractComment;
use App\Repositories\Contracts\ContractCommentRepositoryInterface;

class EloquentContractCommentRepository implements ContractCommentRepositoryInterface
{
    public function getCommentsForContract(int $contractId)
    {
        return ContractComment::where('contract_id', $contractId)
            ->with('author')
            ->latest()
            ->get();
    }

    public function createForContract(int $contractId, array $data)
    {
        return ContractComment::create([
            'contract_id' => $contractId,
            'comment' => $data['comment'],
            'created_by' => $data['user_id']
        ])->load('author');
    }

    public function updateComment(int $commentId, array $data, int $userId)
    {
        $comment = ContractComment::where('created_by', $userId)
            ->findOrFail($commentId);

        $comment->update(['comment' => $data['comment']]);
        return $comment->fresh('author');
    }

    public function deleteComment(int $commentId, int $userId)
    {


        /* Possiblity to only comment owner can delete but for test reason now we use like this
        $comment = ContractComment::where('created_by', $userId)
            ->findOrFail($commentId); */
        $comment = ContractComment::where('created_by', $userId)
            ->findOrFail($commentId);

        $comment->delete();
        return true;
    }

}