<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAuthRequest;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(AdminAuthRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $admin = Admin::where('email', $request->email)->first();
        if (Hash::check($credentials['password'], $admin->password)) {
            $token = $admin->createToken('Admin Token')->plainTextToken;

            return apiResponse([
                'admin' => $admin,
                'token' => $token,
            ]);
        }

        return apiErrorResponse(
            'Invalid credentials',
            401
        );
    }

    public function logout(Request $request)
    {
        $admin = $request->user();
        $admin->currentAccessToken()->delete();

        return apiResponse(
            message: 'Logged out successfully',
        );
    }

    public function profile()
    {
        return apiResponse(
            data: Auth::user(),
        );
    }
}
