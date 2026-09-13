<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('business_type')->default('');
            $table->string('category');
            $table->string('sub_category')->default('');
            $table->text('description')->nullable();
            $table->string('established_year')->default('');
            $table->string('employees')->default('');
            $table->enum('country', ['India', 'Canada']);
            $table->string('state')->default('');
            $table->string('city');
            $table->string('address')->default('');
            $table->string('postal_code')->default('');
            $table->double('lat')->default(0);
            $table->double('lng')->default(0);
            $table->string('phone')->default('');
            $table->string('whatsapp')->default('');
            $table->string('email')->default('');
            $table->string('website')->default('');
            $table->string('logo_url')->default('');
            $table->string('cover_url')->default('');
            $table->json('gallery_urls')->nullable();
            $table->string('video_url')->default('');
            $table->string('hours')->default('');
            $table->string('source')->default('');
            $table->string('source_url')->default('');
            $table->enum('status', ['Verified', 'Pending', 'Suspended'])->default('Pending');
            $table->unsignedInteger('leads')->default(0);
            $table->timestamp('joined')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
