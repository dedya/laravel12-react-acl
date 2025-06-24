<?php

namespace App\Abstracts;

use App\Interfaces\Job\ShouldUpdate;
use App\Traits\Jobs;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Utilities\QueueCollection;

abstract class Job implements ShouldQueue
{
    use Jobs, InteractsWithQueue, Queueable;
    // SerializesModels;

    protected $model;

    protected $request;

    public function __construct(...$arguments)
    {
        $this->booting(...$arguments);
        $this->booted(...$arguments);
        $this->bootUpdate(...$arguments);

    }

    public function booting(...$arguments): void
    {
        //
    }

    public function booted(...$arguments): void
    {
        //
    }

    public function bootUpdate(...$arguments): void
    {
        if (! $this instanceof ShouldUpdate) {
            return;
        }

        if ($arguments[0] instanceof Model) {
            $this->model = $arguments[0];
        }

        if (empty($arguments[1])) {
            $arguments[1] = [];
        }

        $request = $this->getRequestInstance($arguments[1]);
        if ($request instanceof QueueCollection) {
            $this->request = $request;
        }

    }

    public function getRequestInstance($request)
    {
        return $this->getRequestAsCollection($request);
    }

    /**
     * Covert the request to collection.
     *
     * @param mixed $request
     * @return \App\Utilities\QueueCollection
     */
    public function getRequestAsCollection($request)
    {
        if (is_array($request)) {
            $data = $request;

            $request = new class() extends FormRequest {};

            $request->merge($data);
        }

        return new QueueCollection($request->all());
    }


}