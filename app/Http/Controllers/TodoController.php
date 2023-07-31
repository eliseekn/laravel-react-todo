<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoCollection;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(): TodoCollection
    {
        return new TodoCollection(
            Todo::query()->latest()->paginate()
        );
    }

    public function show(Todo $todo): JsonResponse
    {
        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo): JsonResponse
    {
        $todo->update($request->only(['description', 'completed']));
        return response()->json($todo);
    }

    public function store(Request $request): JsonResponse
    {
        $todo = Todo::factory()->create($request->only(['description', 'completed']));
        return response()->json($todo);
    }

    public function destroy(Todo $todo): TodoCollection
    {
        $todo->delete();

        return new TodoCollection(
            Todo::query()->latest()->paginate()
        );
    }
}
