<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Facades\Log;

class UserRequest extends FormRequest
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
        Log::info('user request', ["aaa",$this->all()]);

        $rules = [
            'name' => 'required|string|max:255',
            'role' => 'required|string|exists:roles,name',
            'user_group_id' => 'required|exists:user_groups,id',
        ];

        if ($this->isMethod('post')) {
            // Store
            $rules['email'] = 'required|email|unique:users';
            $rules['password'] = 'required|string|min:6';
        } else {
            // Update
            //$userId = is_numeric($this->user) ? $this->user : $this->user->getAttribute('id');
            $userId = $this->route('user') ? $this->route('user')->id : null;
            $rules['email'] = 'required|email|unique:users,email,' . $userId;
            $rules['password'] = $this->request->get('change_password') ? 'required|string|min:6' : 'nullable';
        }
              
        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'role.required' => 'Role is required',
            'user_group_id.required' => 'User group is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email already exists',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
        ];
    }
    
    public function attributes()
    {
        return [
            'name' => 'Name',
            'role' => 'Role',
            'user_group_id' => 'User group',
            'email' => 'Email',
            'password' => 'Password',
        ];
    }
}
