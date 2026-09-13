<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Lead;
use App\Models\Location;
use App\Models\Product;
use App\Models\Review;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::whereIn('status', ['Verified', 'Pending']);

        if ($request->filled('q')) {
            $term = $request->string('q');
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                    ->orWhere('category', 'like', "%{$term}%")
                    ->orWhere('city', 'like', "%{$term}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category'));
        }

        if ($request->filled('city')) {
            $query->where('city', $request->string('city'));
        }

        $businesses = $query->orderByDesc('joined')->paginate(12)->withQueryString();

        $categories = Category::where('status', 'Active')->orderBy('name')->get();
        $cities = Location::where('status', 'Active')->orderBy('city')->get();

        return view('pages.businesses', compact('businesses', 'categories', 'cities'));
    }

    public function show(string $slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();

        $products = Product::where('business', $business->name)->where('status', 'Active')->get();
        $services = Service::where('business', $business->name)->where('status', 'Active')->get();
        $reviews = Review::where('business', $business->name)->where('status', 'Approved')->latest()->get();

        $rating = $reviews->count() ? round($reviews->avg('rating'), 1) : 0;

        return view('pages.business-detail', compact('business', 'products', 'services', 'reviews', 'rating'));
    }

    public function enquire(Request $request, string $slug)
    {
        $business = Business::where('slug', $slug)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'message' => ['nullable', 'string', 'max:2000'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Lead::create([
            'business' => $business->name,
            'customer' => $request->input('name'),
            'interest' => $request->input('message') ?: 'General enquiry',
            'status' => 'New',
        ]);

        $business->increment('leads');

        return back()->with('enquirySent', true);
    }
}
