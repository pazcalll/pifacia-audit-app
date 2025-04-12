<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $items = Item::paginate(10);

        return apiPaginationResponse($items);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        //
        $validated = $request->validated();
        $item = Item::create([
            ...$validated,
            'admin_id' => $request->user()->id,
        ]);

        return apiResponse(
            data: $item,
            message: 'Item created successfully',
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
        return apiResponse(
            data: $item,
            message: 'Item retrieved successfully',
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
        $validated = $request->validated();
        $validated['active'] = $validated['active'] == 'inactive' ? false : true;
        $item->update($validated);
        return apiResponse(
            data: $item,
            message: 'Item updated successfully',
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
        $item->delete();
        return apiResponse(
            message: 'Item deleted successfully',
        );
    }
}
