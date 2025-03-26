<?php

namespace App\Repositories\Eloquent;

use App\Models\Client;
use App\Repositories\Contracts\ClientRepositoryInterface;

class EloquentClientRepository implements ClientRepositoryInterface
{
    public function __construct(protected Client $model)
    {
    }

    public function getAll()
    {
        return $this->model->all();
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
        $client = $this->findById($id);
        $client->update($data);
        return $client;
    }

    public function delete(int $id)
    {
        $client = $this->findById($id);
        return $client->delete();
    }

    public function forceDelete(int $id)
    {
        $client = $this->model->withTrashed()->findOrFail($id);
        return $client->forceDelete();
    }

    public function restore(int $id)
    {
        $client = $this->model->onlyTrashed()->findOrFail($id);
        $client->restore();
        return $client;
    }
}