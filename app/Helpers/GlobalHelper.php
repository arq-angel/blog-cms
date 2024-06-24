<?php

use Illuminate\Support\Facades\Auth;

const CONFIG = [
    'noOfNavLinks' => 6,
    'noOfRecentPosts' => 10,
    'noOfPostsPerPage' => 5,
    'noOfCommentsPerPage' => 10,
];

if (!function_exists('getAuthenticateduser')) {
    function getAuthenticateduser()
    {
        return Auth::user();
    }
}
