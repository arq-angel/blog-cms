<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function index() {
        $auth = getAuthenticateduser();

        return inertia('Admin/index', [
            'auth' => $auth,
        ]);
    }
}
