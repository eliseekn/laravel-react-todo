<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Todo::query()->latest()->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(['description' => 'required']);

        $todo = Todo::factory()->create($data);
        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo): JsonResponse
    {
        $data = $request->validate([
            'description' => ['sometimes', 'required'],
            'completed' => ['sometimes', 'required']
        ]);

        $data['updated_at'] = now();
        $todo->update($data);
        return response()->json($todo);
    }

    public function destroy(Todo $todo): JsonResponse
    {
        $todo->delete();

        return response()->json(
            Todo::query()->latest()->get()
        );
    }
}
