<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $audits = Audit::query()
            ->latest()
            ->with(['auditable', 'user'])
            ->with('user')
            ->latest()
            ->paginate();
        return apiPaginationResponse($audits);
    }
}
