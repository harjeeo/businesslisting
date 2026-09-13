<x-layout title="Browse Businesses">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Browse Businesses</h1>
        <p class="mt-1 text-sm text-gray-500">{{ $businesses->total() }} businesses found</p>

        <form method="GET" class="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-4">
            <div class="sm:col-span-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <x-icon name="search" class="size-4 text-gray-400" />
                <input type="text" name="q" value="{{ request('q') }}" placeholder="Search by name, category, city..." class="w-full border-0 p-0 text-sm focus:outline-none focus:ring-0">
            </div>

            <select name="category" class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="">All Categories</option>
                @foreach ($categories as $category)
                    <option value="{{ $category->name }}" @selected(request('category') === $category->name)>{{ $category->name }}</option>
                @endforeach
            </select>

            <select name="city" class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="">All Cities</option>
                @foreach ($cities as $city)
                    <option value="{{ $city->city }}" @selected(request('city') === $city->city)>{{ $city->city }}</option>
                @endforeach
            </select>

            <button type="submit" class="sm:col-span-4 justify-self-start rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                Apply Filters
            </button>
        </form>

        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            @forelse ($businesses as $business)
                @include('partials.business-card', ['business' => $business])
            @empty
                <p class="col-span-full text-center text-sm text-gray-400">No businesses match your search.</p>
            @endforelse
        </div>

        <div class="mt-10">
            {{ $businesses->links() }}
        </div>
    </div>
</x-layout>
