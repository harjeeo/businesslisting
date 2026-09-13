<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Location;

class PublicController extends Controller
{
    public function businesses()
    {
        $businesses = Business::whereIn('status', ['Verified', 'Pending'])
            ->orderByDesc('joined')
            ->get();

        return response()->json($businesses);
    }

    public function businessBySlug(string $slug)
    {
        $business = Business::where('slug', $slug)->first();

        if (! $business) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($business);
    }

    public function categories()
    {
        return response()->json(Category::where('status', 'Active')->orderBy('name')->get());
    }

    public function locations()
    {
        return response()->json(Location::where('status', 'Active')->orderBy('city')->get());
    }
}
