<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $auth = GetAuthenticatedUser();
        $limit = $request->limit ?? CONFIG['noOfPostsPerPage'];
        $page = $request->page ?? 1;
        $searchQuery = $request->query('searchQuery', '');
        $query = Post::query();
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

    public function showPost(Post $post, Request $request)
    {
        $limit = $request->limit ?? CONFIG['noOfCommentsPerPage'];
        $page = $request->input('page', 1);
        $auth = GetAuthenticatedUser();

        $navLinks = Category::orderBy('updated_at', 'desc')
            ->limit(CONFIG['noOfNavLinks'])
            ->get()
            ->toArray();

        $categories = Category::all();
        $recentPosts = Post::orderBy('created_at', 'desc')
            ->limit(CONFIG['noOfRecentPosts'])
            ->get();

        $comments = Comment::where('post_id', $post->id)
            ->where('status', 1) // 1 = approved
            ->orderBy('created_at', 'desc')
            ->paginate($limit, ['*'], 'page', $page)
            ->onEachSide(1);

        return inertia('Post/index', [
            'auth' => $auth,
            'post' => new PostResource($post),
            'comments' => CommentResource::collection($comments),
            'navLinks' => $navLinks,
            'categories' => $categories,
            'recentPosts' => $recentPosts,
            'queryParams' => $request->query() ?: null,
        ]);
    }
}
