<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckIfAdmin
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
                return redirect()->route('home');
            }

            if ($userType === 'admin') {
                return $next($request);
            }

            return redirect()->back();
        }

        return redirect()->route('login');
    }
}
