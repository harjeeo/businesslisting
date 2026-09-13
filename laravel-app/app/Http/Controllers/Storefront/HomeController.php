<?php

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Location;

class HomeController extends Controller
{
    private const CATEGORY_ICONS = [
        'Electronics' => '📱',
        'Construction' => '🏗️',
        'Professional Services' => '💼',
        'Manufacturing' => '🏭',
        'Retail' => '🛍️',
        'IT Services' => '💻',
        'Home Services' => '🛠️',
        'Legal & Immigration' => '⚖️',
        'Restaurants' => '🍽️',
        'Automotive' => '🚗',
        'Mobile Phones' => '📲',
        'Contractors' => '👷',
        'Lawyers' => '⚖️',
    ];

    public function __invoke()
    {
        $categories = Category::where('status', 'Active')
            ->whereNull('parent')
            ->orderByDesc('businesses')
            ->get()
            ->map(fn (Category $c) => (object) [
                'name' => $c->name,
                'slug' => \Illuminate\Support\Str::slug($c->name),
                'count' => $c->businesses,
                'icon' => self::CATEGORY_ICONS[$c->name] ?? '🏢',
            ]);

        $cities = Location::where('status', 'Active')
            ->orderByDesc('businesses')
            ->get();

        $featured = Business::whereIn('status', ['Verified', 'Pending'])
            ->orderByDesc('leads')
            ->limit(6)
            ->get();

        $stats = [
            ['label' => 'Businesses Listed', 'value' => Business::count() . '+'],
            ['label' => 'Cities Covered', 'value' => Location::count() . '+'],
            ['label' => 'Verified Businesses', 'value' => Business::where('status', 'Verified')->count() . '+'],
            ['label' => 'Countries', 'value' => 'India & Canada'],
        ];

        return view('pages.home', compact('categories', 'cities', 'featured', 'stats'));
    }
}
