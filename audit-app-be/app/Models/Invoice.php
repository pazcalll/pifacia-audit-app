<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Invoice extends Model implements Auditable
{
    //
    use
        SoftDeletes,
        HasUuids,
        \OwenIt\Auditing\Auditable;

    protected $guarded = ['id'];

    protected $appends = [
        'transfer_evidence_url',
    ];

    public function getTransferEvidenceUrlAttribute()
    {
        return asset('storage/' . $this->transfer_evidence_path);
    }

    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
