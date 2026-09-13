<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return response()->json(AdminUser::orderByDesc('id')->get());
    }

    public function show(int $id)
    {
        return response()->json(AdminUser::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->except(['password']);
        $data['password_hash'] = Hash::make($request->input('password') ?: 'password123');

        $admin = AdminUser::create($data);

        return response()->json($admin, 201);
    }

    public function update(Request $request, int $id)
    {
        $admin = AdminUser::findOrFail($id);
        $data = $request->except(['password']);

        if ($request->filled('password')) {
            $data['password_hash'] = Hash::make($request->input('password'));
        }

        $admin->update($data);

        return response()->json($admin);
    }

    public function destroy(int $id)
    {
        AdminUser::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
