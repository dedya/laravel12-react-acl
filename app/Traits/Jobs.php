<?php

namespace App\Traits;

use Exception;
use Illuminate\Contracts\Bus\Dispatcher;
use Throwable;

trait Jobs {
    /**
     * Dispatch a job to its appropriate handler.
     *
     * @param mixed $job
     * @return mixed
     */
    public function dispatch($job)
    {
        try {
            $function = $this->getDispatchFunction();
            $data = $this->$function($job);

            $response = [
                'success' => true,
                'error' => false,
                'data' => $data,
                'message' => '',
            ];
        } catch (Exception | Throwable $e) {
            $response = [
                'success' => false,
                'error' => true,
                'data' => null,
                'message' => $e->getMessage(),
            ];
        }

        return $response;
    }

    public function getDispatchFunction()
    {
        return should_queue() ? 'dispatchQueue' : 'dispatchSync';
    }

    /**
     * Dispatch a job to its appropriate handler.
     *
     * @param  mixed  $command
     * @return mixed
     */
    public function dispatchQueue($job)
    {
        return app(Dispatcher::class)->dispatch($job);
    }

    /**
     * Dispatch a command to its appropriate handler in the current process.
     *
     * Queuable jobs will be dispatched to the "sync" queue.
     *
     * @param  mixed  $command
     * @param  mixed  $handler
     * @return mixed
     */
    public function dispatchSync($job, $handler = null)
    {
        return app(Dispatcher::class)->dispatchSync($job, $handler);
    }
}