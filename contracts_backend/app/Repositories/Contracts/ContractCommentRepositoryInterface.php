<?php

namespace App\Repositories\Contracts;

interface ContractCommentRepositoryInterface
{
    public function getCommentsForContract(int $contractId);
    public function createForContract(int $contractId, array $data);
    public function updateComment(int $commentId, array $data, int $userId);
    public function deleteComment(int $commentId, int $userId);
}