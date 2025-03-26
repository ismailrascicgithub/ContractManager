<?php

namespace App\Services;

use App\Models\Contract;
use Carbon\Carbon;

class ContractService
{
    public function generateUniqueReference(): string
    {
        do {
            $datePart = Carbon::now()->format('ymd');
            $randomPart = mt_rand(1000, 9999);
            $reference = "CTR-{$datePart}-{$randomPart}";
        } while ($this->referenceExists($reference));

        return $reference;
    }

    private function referenceExists(string $reference): bool
    {
        return Contract::withTrashed()
            ->where('reference', $reference)
            ->exists();
    }
}