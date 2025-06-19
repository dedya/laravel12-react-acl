<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Facades\Log;

class UserGroupRequest extends FormRequest
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
            'name' => 'required|string|max:255',
        ];

        if ($this->isMethod('post')) {
            // Store
            $rules['name'] = 'required|string|unique:user_groups';
        } else {
            // Update
            $userGroupId = $this->route('usergroups') ? $this->route('usergroups')->id : null;
            $rules['name'] = 'required|string|unique:user_groups,name,' . $userGroupId;
        }
              
        return $rules;
    }
}
