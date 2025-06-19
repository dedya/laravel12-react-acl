<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ];
        
        if ($this->isMethod('post')) {
            // Store
            $rules['name'] = 'required|string|max:255|unique:roles,name';
        } else {
            // Update
            $id = $this->route('role') ? $this->route('role')->id : null;
            $rules['name'] = 'required|string|max:255|unique:roles,name,'.$id;
        }

        return $rules;
    }
}
