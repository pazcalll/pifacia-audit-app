<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserAuthRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate();
        return apiPaginationResponse($users);
    }

    public function login(UserAuthRequest $request)
    {
        $validated = $request->validated();
        $user = User::where('email', $request->email)->first();

        if (!Hash::check($validated['password'], $user->password)) {
            return apiErrorResponse('Unauthorized', 401);
        }

        $token = $user->createToken('User Token')->plainTextToken;

        return apiResponse([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(UserRegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        return apiResponse(
            data: [
                'user' => $user,
                'token' => $user->createToken('User Token')->plainTextToken,
            ],
            message: 'User created successfully',
        );
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return apiResponse(
            message: 'Logged out successfully',
        );
    }

    public function profile()
    {
        $user = Auth::user();
        return apiResponse($user);
    }

    public function updateProfile(UpdateUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::find($request->user()->id);
        $user->update($validated);

        return apiResponse($user, 'Profile updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return apiResponse(message: 'User deleted successfully');
    }

    public function restore(string $userId)
    {
        User::withTrashed()->find($userId)->restore();
        return apiResponse(message: 'User restored successfully');
    }
}
