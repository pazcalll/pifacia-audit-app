<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->user() instanceof User) return true;

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'code' => ['required', 'string', 'max:100', 'unique:invoices,code'],
            'transfer_evidence' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:500', 'min:100'],
            'invoice_items' => ['required', 'array'],
            'invoice_items.*.item_id' => ['required', 'exists:items,id', 'distinct'],
            'invoice_items.*.item_quantity' => ['required', 'numeric', 'min:1', 'max:100'],
        ];
    }
}
