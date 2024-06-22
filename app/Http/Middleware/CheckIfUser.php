<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckIfUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::id()) {
            $userType = Auth()->user()->user_type;

            if ($userType === 'user') {
                return $next($request);
            }

            if ($userType === 'admin') {
                return redirect()->route('dashboard');
            }

            return redirect()->back();
        }

        return redirect()->route('login');
    }
}
