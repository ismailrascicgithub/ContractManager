<?php

namespace App\Repositories\Contracts;

interface ContractRepositoryInterface
{
    public function getAllWithFilters(array $filters);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}