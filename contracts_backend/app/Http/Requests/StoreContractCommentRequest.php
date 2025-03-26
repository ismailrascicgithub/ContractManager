<?php

namespace App\Http\Requests;

use App\Models\ContractComment;
use Illuminate\Foundation\Http\FormRequest;

class StoreContractCommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'comment' => 'required|string|max:100'
        ];
    }

    public function messages()
    {
        return [
            'comment.required' => 'Comment text is required',
            'comment.max' => 'Comment cannot exceed 1000 characters'
        ];
    }

    protected function failedAuthorization()
    {
        abort(response()->json([
            'error' => 'comment_authorization_error',
            'message' => 'You are not authorized to add comments'
        ], 403));
    }
}