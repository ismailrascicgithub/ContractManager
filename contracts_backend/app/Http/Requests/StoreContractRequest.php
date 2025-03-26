<?php

namespace App\Http\Requests;

use App\Models\Contract;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContractRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $contract = $this->route('contract');

        return [
            'client_id' => 'required|exists:clients,id',
            'reference' => [
                'required',
                'string',
                'max:255',
                'regex:/^CTR-\d{6}-\d{4}$/',
                Rule::unique('contracts')->ignore($contract?->id)
            ],
            'start_date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'value' => 'nullable|numeric|min:0'
        ];
    }

    public function messages()
    {
        return [
            'client_id.required' => 'Client selection is required',
            'client_id.exists' => 'Selected client does not exist',
            'reference.required' => 'Reference is required',
            'reference.regex' => 'Invalid reference format (CTR-YYMMDD-XXXX)',
            'reference.unique' => 'This reference already exists',
            'start_date.required' => 'Start date is required',
            'start_date.date' => 'Invalid date format',
            'duration.min' => 'Duration must be at least 1 month'
        ];
    }
}