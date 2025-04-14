<?php

namespace App\Http\Controllers;

use App\Exports\InvoiceExport;
use App\Models\Invoice;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $invoices = Invoice::query()
            ->latest()
            ->withTotalPrice()
            ->paginate();

        return apiPaginationResponse($invoices);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        //
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $invoice = Invoice::create([
                'user_id' => $request->user()->id,
                'code' => $validated['code'],
                'transfer_evidence_path' => $request->file('transfer_evidence')->store('transfer_evidence', 'public'),
            ]);

            $invoiceItems = [];
            foreach ($validated['invoice_items'] as $item) {
                $invoiceItems[] = [
                    'item_id' => $item['item_id'],
                    'quantity' => $item['item_quantity'],
                    'item_object' => Item::find($item['item_id']),
                ];
            }

            $invoice->invoiceItems()->createMany($invoiceItems);
            $invoice->save();

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return apiErrorResponse($th->getMessage());
        }

        return apiResponse($invoice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
        $invoice = $invoice->withTotalPrice()
            ->with(['user', 'invoiceItems'])
            ->find($invoice->id);
        return apiResponse($invoice);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
        $invoice->delete();
        return apiResponse(message: 'Invoice deleted successfully');
    }

    public function export()
    {
        return Excel::download(new InvoiceExport, 'invoices.xlsx');
    }
}
