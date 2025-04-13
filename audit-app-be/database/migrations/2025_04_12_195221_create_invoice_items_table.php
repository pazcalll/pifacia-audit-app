<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('invoice_id');
            $table->foreignUuid('item_id');
            $table->integer('quantity')->default(1);
            $table->json('item_object');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('invoice_id')
                ->references('id')
                ->on('invoices');
            $table->foreign('item_id')
                ->references('id')
                ->on('items');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
