<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('business');
            $table->string('customer');
            $table->string('interest');
            $table->enum('status', [
                'New', 'Contacted', 'InDiscussion', 'QuotationSent', 'Won', 'Lost',
            ])->default('New');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
