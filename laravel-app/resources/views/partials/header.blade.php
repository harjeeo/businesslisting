<header class="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="{{ route('home') }}" class="flex items-center gap-2 text-lg font-bold text-gray-900">
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
                <x-icon name="store" class="size-5" />
            </span>
            BizList
        </a>

        <nav class="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex">
            <a href="{{ route('home') }}" class="hover:text-violet-600">Home</a>
            <a href="{{ route('businesses.index') }}" class="hover:text-violet-600">Browse Businesses</a>
        </nav>

        <div class="flex items-center gap-3">
            <a href="{{ route('businesses.index') }}" class="hidden rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 sm:inline-block">
                List Your Business
            </a>
            <button type="button" class="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 sm:hidden" aria-label="Menu">
                <x-icon name="menu" class="size-5" />
            </button>
        </div>
    </div>
</header>
