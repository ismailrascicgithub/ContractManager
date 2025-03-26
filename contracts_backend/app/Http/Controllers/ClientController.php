<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Repositories\Contracts\ClientRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ClientController extends Controller
{
    use AuthorizesRequests;
    public function __construct(protected ClientRepositoryInterface $repository)
    {
    }

    public function index()
    {
        $this->authorize('viewAny', Client::class);
        return $this->repository->getAll();
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:clients,name']);
        return $this->repository->create($validated);
    }

    public function show(int $id)
    {
        return $this->repository->findById($id);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:clients,name,' . $id]);
        return $this->repository->update($id, $validated);
    }

    public function destroy(int $id)
    {
        try {
            return $this->repository->delete($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Cannot delete client with contracts'], 422);
        }
    }
}
