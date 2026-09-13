<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class CrudController extends Controller
{
    /** @var class-string<Model> */
    protected string $model;

    public function index()
    {
        return response()->json($this->model::orderByDesc('id')->get());
    }

    public function show(int $id)
    {
        return response()->json($this->model::findOrFail($id));
    }

    public function store(Request $request)
    {
        $record = $this->model::create($this->snakeCaseInput($request));

        return response()->json($record, 201);
    }

    public function update(Request $request, int $id)
    {
        $record = $this->model::findOrFail($id);
        $record->update($this->snakeCaseInput($request));

        return response()->json($record);
    }

    protected function snakeCaseInput(Request $request): array
    {
        $snakeCased = [];
        foreach ($request->all() as $key => $value) {
            $snakeCased[Str::snake($key)] = $value;
        }

        return $snakeCased;
    }

    public function destroy(int $id)
    {
        $this->model::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
