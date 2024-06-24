<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
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
    public function store(CommentRequest $request)
    {
        $returnData = [
            "isSuccess" => false,
            "message" => "Could not submit comment",
        ];

        $validatedData = $request->validated();
        //$validatedData['status'] = 0;
        $validatedData['status'] = 1; // 1 = approved by default for now

        try {
            $comment = new Comment;
            $comment->fill($validatedData);
            $comment->save();

            $returnData = [
                "isSuccess" => true,
                "message" => "Comment submitted successfully",
                "comment" => $comment,
            ];
            return response()->json($returnData, 200);

        } catch (\Exception $exception) {
            $returnData['debug'] = $exception->getMessage();
        }

        return response()->json($returnData, 400);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
