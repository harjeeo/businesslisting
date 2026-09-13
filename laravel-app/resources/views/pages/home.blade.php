<x-layout title="Find Verified Businesses in India & Canada">
    {{-- Hero --}}
    <section class="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white">
        <div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
            <h1 class="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Find Verified Businesses Across
                <span class="text-violet-600">India &amp; Canada</span>
            </h1>
            <p class="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
                Search thousands of businesses, products and services. Compare, enquire, and connect — all in one place.
            </p>

            <form action="{{ route('businesses.index') }}" method="GET" class="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-gray-100 sm:flex-row">
                <div class="flex flex-1 items-center gap-2 px-3">
                    <x-icon name="search" class="size-5 shrink-0 text-gray-400" />
                    <input
                        type="text"
                        name="q"
                        placeholder="Search businesses, categories, products..."
                        class="w-full border-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                    >
                </div>
                <button type="submit" class="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700">
                    Search
                </button>
            </form>

            <div class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
                <span>Popular:</span>
                @foreach (['Electronics', 'IT Services', 'Retail', 'Construction'] as $tag)
                    <a href="{{ route('businesses.index', ['category' => $tag]) }}" class="rounded-full border border-gray-200 px-3 py-1 hover:border-violet-300 hover:text-violet-600">
                        {{ $tag }}
                    </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Stats bar --}}
    <section class="border-b border-gray-200 bg-white">
        <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
            @foreach ($stats as $stat)
                <div class="text-center">
                    <p class="text-xl font-semibold text-gray-900 sm:text-2xl">{{ $stat['value'] }}</p>
                    <p class="mt-1 text-xs text-gray-500 sm:text-sm">{{ $stat['label'] }}</p>
                </div>
            @endforeach
        </div>
    </section>

    {{-- Category grid --}}
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mb-8 flex items-end justify-between">
            <div>
                <h2 class="text-2xl font-semibold text-gray-900">Browse by Category</h2>
                <p class="mt-1 text-sm text-gray-500">Explore businesses across popular categories</p>
            </div>
            <a href="{{ route('businesses.index') }}" class="hidden text-sm font-medium text-violet-600 hover:text-violet-700 sm:inline-flex sm:items-center sm:gap-1">
                View all <x-icon name="arrow-right" class="size-4" />
            </a>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            @forelse ($categories as $category)
                <a href="{{ route('businesses.index', ['category' => $category->name]) }}" class="group rounded-xl border border-gray-100 p-5 text-center transition hover:border-violet-200 hover:shadow-md">
                    <div class="text-3xl">{{ $category->icon }}</div>
                    <p class="mt-3 text-sm font-semibold text-gray-900 group-hover:text-violet-600">{{ $category->name }}</p>
                    <p class="mt-1 text-xs text-gray-400">{{ $category->count }} businesses</p>
                </a>
            @empty
                <p class="col-span-full text-sm text-gray-400">No categories yet.</p>
            @endforelse
        </div>
    </section>

    {{-- City grid --}}
    <section class="border-t border-gray-100 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-8 text-center">
                <h2 class="text-2xl font-semibold text-gray-900">Popular Cities</h2>
                <p class="mt-1 text-sm text-gray-500">Discover businesses in top cities across India &amp; Canada</p>
            </div>

            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                @foreach ($cities as $city)
                    <a href="{{ route('businesses.index', ['city' => $city->city]) }}" class="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 transition hover:shadow-md">
                        <p class="text-sm font-semibold text-gray-900">{{ $city->city }}</p>
                        <p class="mt-1 text-xs text-gray-400">{{ $city->country }} &middot; {{ $city->businesses }}+ businesses</p>
                    </a>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Featured businesses --}}
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mb-8 flex items-end justify-between">
            <div>
                <h2 class="text-2xl font-semibold text-gray-900">Featured Businesses</h2>
                <p class="mt-1 text-sm text-gray-500">Top-rated, verified businesses on our platform</p>
            </div>
            <a href="{{ route('businesses.index') }}" class="hidden text-sm font-medium text-violet-600 hover:text-violet-700 sm:inline-flex sm:items-center sm:gap-1">
                View all <x-icon name="arrow-right" class="size-4" />
            </a>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @foreach ($featured as $business)
                @include('partials.business-card', ['business' => $business])
            @endforeach
        </div>
    </section>

    {{-- How it works --}}
    <section class="border-t border-gray-100 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-10 text-center">
                <h2 class="text-2xl font-semibold text-gray-900">How It Works</h2>
                <p class="mt-1 text-sm text-gray-500">Three simple steps to find what you need</p>
            </div>

            <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
                @foreach ([
                    ['icon' => 'search', 'title' => 'Search & Compare', 'description' => 'Search businesses, products or services by category and location, then compare verified listings.'],
                    ['icon' => 'mail', 'title' => 'Send an Enquiry', 'description' => 'Contact businesses directly or submit an enquiry to get quotes from multiple sellers at once.'],
                    ['icon' => 'check-circle', 'title' => 'Connect & Close', 'description' => 'Compare quotes, chat with businesses, and close the deal with confidence.'],
                ] as $i => $step)
                    <div class="text-center">
                        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
                            <x-icon :name="$step['icon']" class="size-6" />
                        </div>
                        <span class="mt-3 block text-xs font-semibold text-violet-500">STEP {{ $i + 1 }}</span>
                        <h3 class="mt-1 text-lg font-semibold text-gray-900">{{ $step['title'] }}</h3>
                        <p class="mt-2 text-sm text-gray-500">{{ $step['description'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- CTA banner --}}
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center gap-6 rounded-2xl bg-violet-600 px-6 py-12 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div>
                <h2 class="text-2xl font-semibold">Own a business? Get listed today.</h2>
                <p class="mt-2 text-sm text-violet-100">Join thousands of businesses reaching new customers across India &amp; Canada.</p>
            </div>
            <a href="{{ route('businesses.index') }}" class="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50">
                List Your Business
            </a>
        </div>
    </section>

    {{-- Testimonials --}}
    <section class="border-t border-gray-100 bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-10 text-center">
                <h2 class="text-2xl font-semibold text-gray-900">What People Say</h2>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                @foreach ([
                    ['name' => 'Rahul Verma', 'role' => 'Customer, Delhi', 'quote' => 'Found a reliable packaging supplier within a day. The enquiry process was super smooth.', 'rating' => 5],
                    ['name' => 'Emily Johnson', 'role' => 'Business Owner, Toronto', 'quote' => 'Listing my web studio here brought in genuine leads from week one.', 'rating' => 5],
                    ['name' => 'Amit Sharma', 'role' => 'Customer, Ludhiana', 'quote' => 'Comparing verified electronics stores near me saved a lot of time.', 'rating' => 4],
                ] as $testimonial)
                    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                        <div class="flex gap-1 text-amber-400">
                            @for ($i = 0; $i < $testimonial['rating']; $i++)
                                <x-icon name="star" class="size-4 fill-current" />
                            @endfor
                        </div>
                        <p class="mt-3 text-sm text-gray-600">&ldquo;{{ $testimonial['quote'] }}&rdquo;</p>
                        <p class="mt-4 text-sm font-semibold text-gray-900">{{ $testimonial['name'] }}</p>
                        <p class="text-xs text-gray-400">{{ $testimonial['role'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
</x-layout>
