<?php

namespace App\Http\Controllers;

use Auth;
use App\Http\Requests\StoreContractCommentRequest;
use App\Repositories\Contracts\ContractCommentRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\ContractComment;

class ContractCommentController extends Controller
{
    use AuthorizesRequests;

    public function __construct(protected ContractCommentRepositoryInterface $repository)
    {
    }

    public function index(int $contractId)
    {
        $this->authorize('viewAny', ContractComment::class);
        return $this->repository->getCommentsForContract($contractId);
    }

    public function store(StoreContractCommentRequest $request, int $contractId)
    {
        $this->authorize('create', ContractComment::class);
        
        return $this->repository->createForContract($contractId, [
            'comment' => $request->validated()['comment'],
            'user_id' => Auth::id()
        ]);
    }

    public function update(StoreContractCommentRequest $request, int $commentId)
    {
        $comment = ContractComment::findOrFail($commentId);
        $this->authorize('update', $comment);
        
        return $this->repository->updateComment(
            $commentId,
            $request->validated(),
            Auth::id()
        );
    }

    public function destroy(int $commentId)
    {
        $comment = ContractComment::findOrFail($commentId);
        $this->authorize('delete', $comment);
        
        $this->repository->deleteComment($commentId, Auth::id());
        return response()->noContent();
    }
}