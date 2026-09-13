<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::orderByDesc('id')->get());
    }

    public function show(int $id)
    {
        return response()->json(User::findOrFail($id));
    }

    public function toggleBlock(int $id)
    {
        $user = User::findOrFail($id);
        $user->status = $user->status === 'Active' ? 'Blocked' : 'Active';
        $user->save();

        return response()->json($user);
    }
}
