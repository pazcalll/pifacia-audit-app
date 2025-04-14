<?php

namespace App\Exports;

use App\Models\Invoice;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class InvoiceExport implements FromView
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        //
        $invoices = Invoice::query()
            ->with(['user', 'invoiceItems.item'])
            ->withTotalPrice()
            ->latest()
            ->get();

        return view('csv-formatter.invoice-export', [
            'invoices' => $invoices,
        ]);
    }
}
