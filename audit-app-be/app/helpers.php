<?php

use Illuminate\Pagination\LengthAwarePaginator;

if (!function_exists('apiResponse')) {
    function apiResponse($data = null, $message = 'Request success', $status = 200)
    {
        $returnables = [
            'message' => $message,
        ];

        if ($data) {
            $returnables['data'] = $data;
        }

        return response()->json($returnables, $status);
    }
}

if (!function_exists('apiErrorResponse')) {
    function apiErrorResponse($message = 'Request failed', $status = 400)
    {
        return response()->json([
            'message' => $message,
        ], $status);
    }
}

if (!function_exists('apiPaginationResponse')) {
    function apiPaginationResponse(LengthAwarePaginator $data, $status = 200)
    {
        return response()->json([
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ],
            'data' => $data->items(),
        ], $status);
    }
}