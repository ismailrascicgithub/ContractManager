<?php

namespace App\Repositories\Eloquent;

use App\Models\Contract;
use App\Repositories\Contracts\ContractRepositoryInterface;

class EloquentContractRepository implements ContractRepositoryInterface
{
    public function __construct(protected Contract $model)
    {
    }

    public function getAllWithFilters(array $filters)
    {
        return $this->model->with(['client', 'comments.author'])
            ->when($filters['client_id'] ?? null, fn($q, $id) => $q->where('client_id', $id))
            ->when($filters['start_date'] ?? null, fn($q, $date) => $q->where('start_date', '>=', $date))
            ->when($filters['reference'] ?? null, fn($q, $ref) => $q->where('reference', 'like', "%$ref%"))
            ->paginate(request('per_page', 10));
    }

    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $contract = $this->findById($id);
        $contract->update($data);
        return $contract;
    }

    public function delete(int $id)
    {
        $contract = $this->findById($id);
        return $contract->delete();
    }

    public function forceDelete(int $id)
    {
        $contract = $this->model->withTrashed()->findOrFail($id);
        return $contract->forceDelete();
    }

    public function restore(int $id)
    {
        $contract = $this->model->withTrashed()->findOrFail($id);
        $contract->restore();
        return $contract;
    }
}