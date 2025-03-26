<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContractRequest;
use App\Repositories\Contracts\ContractRepositoryInterface;
use App\Services\ContractService;
use Illuminate\Http\Request;
use App\Models\Contract;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ContractController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected ContractRepositoryInterface $repository,
        protected ContractService $contractService
    ) {
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Contract::class);

        $filters = $request->only(['client_id', 'start_date', 'reference']);
        return $this->repository->getAllWithFilters($filters);
    }

    public function store(StoreContractRequest $request)
    {
        $this->authorize('create', Contract::class);

        return $this->repository->create($request->validated());
    }

    public function show(int $id)
    {
        $contract = $this->repository->findById($id);
        $this->authorize('view', $contract);

        return $contract;
    }

    // example of using service for handle with same actions to controller stay clear
    public function update(StoreContractRequest $request, int $id)
    {
        $contract = $this->repository->findById($id);
        $this->authorize('update', $contract);

        return $this->repository->update($id, $request->validated());
    }

    public function destroy(int $id)
    {
        $contract = $this->repository->findById($id);
        $this->authorize('delete', $contract);

        try {
            return $this->repository->delete($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Cannot delete contract'], 422);
        }
    }

    public function generateReference()
    {
        $this->authorize('create', Contract::class);

        return response()->json([
            'reference' => $this->contractService->generateUniqueReference()
        ]);
    }
}