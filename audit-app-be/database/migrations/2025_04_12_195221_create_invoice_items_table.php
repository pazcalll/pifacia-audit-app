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
            $table->uuid();
            $table->foreignUuid('invoice_uuid');
            $table->foreignUuid('item_uuid');
            $table->integer('quantity')->default(1);
            $table->json('item_object');
            $table->timestamps();

            $table->foreign('invoice_uuid')
                ->references('uuid')
                ->on('invoices');
            $table->foreign('item_uuid')
                ->references('uuid')
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
