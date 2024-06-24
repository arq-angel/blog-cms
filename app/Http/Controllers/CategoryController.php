<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category, Request $request)
    {
        $auth = GetAuthenticatedUser();
        $limit = $request->limit ?? 5;
        $page = $request->page ?? 1;
        $searchQuery = $request->query('searchQuery', '');
        $query = Post::query();
        $query = $query->where('category_id', $category->id);
        if (!empty($searchQuery)) {
            $query->where(function ($query) use ($searchQuery) {
                $query->where('title', 'like', "%{$searchQuery}%")
                    ->orWhere('author', 'like', "%{$searchQuery}%")
                    ->orWhere('content', 'like', "%{$searchQuery}%")
                    ->orWhere('tags', 'like', "%{$searchQuery}%");
            });
        }
        $posts = $query->orderBy('updated_at', 'desc')->paginate($limit, ['*'], 'page', $page)->onEachSide(1);
        foreach ($posts as $post) {
            $post->content = Str::limit($post->content, 300);
        }

        $navLinks = Category::orderBy('updated_at', 'desc')->limit(CONFIG['noOfNavLinks'])->get()->toArray();
        $categories = Category::all();
        $recentPosts = Post::orderBy('created_at', 'desc')->limit(CONFIG['noOfRecentPosts'])->get();

        return inertia('Home/index', [
            'auth' => $auth,
            'posts' => PostResource::collection($posts),
            'navLinks' => $navLinks,
            'categories' => $categories,
            'recentPosts' => $recentPosts,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
