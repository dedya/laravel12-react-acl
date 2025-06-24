<?php
/**
 * Helper function 
 */

use Illuminate\Support\Facades\Auth;

if (! function_exists('user')) {
    /**
     * Get the authenticated user.
     *
     * @return \App\Models\Auth\User
     */
    function user()
    {
        return Auth::user();
    }
}

if (! function_exists('should_queue')) {
    /**
     * Check if queue is enabled.
     */
    function should_queue(): bool
    {
        return config('queue.default') != 'sync';
    }
}