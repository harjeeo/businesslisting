<a href="{{ route('businesses.show', $business->slug) }}" class="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
    <div class="relative flex h-32 items-center justify-center bg-gray-50">
        @if ($business->cover_url)
            <img src="{{ $business->cover_url }}" alt="{{ $business->name }}" class="h-full w-full object-cover">
        @else
            <x-icon name="building" class="size-10 text-gray-300" />
        @endif
        @if ($business->status === 'Verified')
            <span class="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-1 text-xs font-medium text-white">
                <x-icon name="shield" class="size-3" /> Verified
            </span>
        @endif
    </div>

    <div class="p-4">
        <p class="text-sm font-semibold text-gray-900 group-hover:text-violet-600">{{ $business->name }}</p>
        <p class="mt-0.5 text-xs text-gray-400">{{ $business->category }}</p>
        <div class="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <x-icon name="location" class="size-4 text-gray-400" />
            {{ $business->city }}, {{ $business->country }}
        </div>
    </div>
</a>
