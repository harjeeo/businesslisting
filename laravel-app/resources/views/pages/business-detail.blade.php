<x-layout :title="$business->name" :description="$business->description">
    @php
        $heroImages = collect([$business->cover_url, $business->logo_url])
            ->merge($business->gallery_urls ?? [])
            ->filter()
            ->unique()
            ->values();
        $heroMain = $heroImages->first();
        $heroThumbs = $heroImages->slice(1, 4);
        $heroExtra = $heroImages->count() - 1 - $heroThumbs->count();
    @endphp

    <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {{-- Header --}}
        <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">{{ $business->name }}</h1>
            @if ($business->status === 'Verified')
                <span class="flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                    <x-icon name="shield" class="size-3" /> Verified
                </span>
            @endif
        </div>
        <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            @if ($rating > 0)
                <span class="flex items-center gap-1 text-amber-500">
                    <x-icon name="star" class="size-4 fill-current" /> {{ $rating }} ({{ $reviews->count() }} reviews)
                </span>
            @endif
            <span>{{ $business->category }}{{ $business->sub_category ? ' · ' . $business->sub_category : '' }}</span>
            <span class="flex items-center gap-1">
                <x-icon name="location" class="size-4 text-gray-400" /> {{ $business->city }}, {{ $business->country }}
            </span>
        </div>

        {{-- Photo gallery --}}
        <div class="mt-5 grid grid-cols-1 gap-2 sm:h-80 sm:grid-cols-[2fr_1fr]">
            <button
                type="button"
                class="relative h-56 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-full"
                @if ($heroMain) data-gallery-trigger data-type="image" data-src="{{ $heroMain }}" @endif
            >
                @if ($heroMain)
                    <img src="{{ $heroMain }}" alt="{{ $business->name }}" class="h-full w-full object-cover">
                @else
                    <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 via-violet-50 to-white">
                        <x-icon name="building" class="size-16 text-violet-200" />
                    </div>
                @endif
            </button>

            @if ($heroThumbs->isNotEmpty())
                <div class="grid grid-cols-4 gap-2 sm:grid-cols-1 sm:grid-rows-4">
                    @foreach ($heroThumbs as $i => $thumb)
                        <button
                            type="button"
                            class="group relative h-24 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-auto"
                            data-gallery-trigger data-type="image" data-src="{{ $thumb }}"
                        >
                            <img src="{{ $thumb }}" alt="{{ $business->name }} photo" class="h-full w-full object-cover transition group-hover:scale-105">
                            @if ($i === $heroThumbs->count() - 1 && $heroExtra > 0)
                                <span class="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-bold text-white">
                                    +{{ $heroExtra }}
                                </span>
                            @endif
                        </button>
                    @endforeach
                </div>
            @endif
        </div>

        {{-- Logo + name row --}}
        <div class="mt-5 flex items-center gap-3">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                @if ($business->logo_url)
                    <img src="{{ $business->logo_url }}" alt="{{ $business->name }} logo" class="h-full w-full object-cover">
                @else
                    <x-icon name="building" class="size-6 text-gray-300" />
                @endif
            </div>
            <p class="text-sm text-gray-500">{{ $business->business_type ?: 'Business' }} in {{ $business->city }}</p>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-10 pb-16 lg:grid-cols-3">
            {{-- Main column --}}
            <div class="space-y-10 lg:col-span-2">
                {{-- About --}}
                <section>
                    <h2 class="text-lg font-semibold text-gray-900">About</h2>
                    <p class="mt-2 text-sm leading-relaxed text-gray-600">{{ $business->description ?: 'No description provided yet.' }}</p>
                    <dl class="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                        @if ($business->business_type)
                            <div><dt class="text-gray-400">Business Type</dt><dd class="font-medium text-gray-900">{{ $business->business_type }}</dd></div>
                        @endif
                        @if ($business->established_year)
                            <div><dt class="text-gray-400">Established</dt><dd class="font-medium text-gray-900">{{ $business->established_year }}</dd></div>
                        @endif
                        @if ($business->employees)
                            <div><dt class="text-gray-400">Employees</dt><dd class="font-medium text-gray-900">{{ $business->employees }}</dd></div>
                        @endif
                    </dl>
                </section>

                {{-- Products --}}
                @if ($products->isNotEmpty())
                    <section>
                        <h2 class="text-lg font-semibold text-gray-900">Products</h2>
                        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            @foreach ($products as $product)
                                <div class="rounded-lg border border-gray-100 p-4">
                                    <p class="text-sm font-semibold text-gray-900">{{ $product->name }}</p>
                                    <p class="mt-1 text-xs text-gray-400">{{ $product->category }}</p>
                                    <p class="mt-2 text-sm font-medium text-violet-600">{{ $product->price }}</p>
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif

                {{-- Services --}}
                @if ($services->isNotEmpty())
                    <section>
                        <h2 class="text-lg font-semibold text-gray-900">Services</h2>
                        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            @foreach ($services as $service)
                                <div class="rounded-lg border border-gray-100 p-4">
                                    <p class="text-sm font-semibold text-gray-900">{{ $service->name }}</p>
                                    <p class="mt-1 text-xs text-gray-400">{{ $service->category }}</p>
                                    <p class="mt-2 text-sm font-medium text-violet-600">From {{ $service->price_from }}</p>
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif

                {{-- Gallery --}}
                @php
                    $galleryItems = collect($business->gallery_urls ?? [])->map(fn ($url) => ['type' => 'image', 'src' => $url]);
                    if ($business->video_url) {
                        $galleryItems->push(['type' => 'video', 'src' => $business->video_url]);
                    }
                @endphp
                @if ($galleryItems->isNotEmpty())
                    <section>
                        <h2 class="text-lg font-semibold text-gray-900">Gallery</h2>
                        <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            @foreach ($galleryItems as $i => $item)
                                <button
                                    type="button"
                                    class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                                    data-gallery-trigger
                                    data-type="{{ $item['type'] }}"
                                    data-src="{{ $item['src'] }}"
                                >
                                    @if ($item['type'] === 'video')
                                        <div class="flex h-full w-full items-center justify-center bg-gray-900/80 text-white">
                                            <x-icon name="play" class="size-8" />
                                        </div>
                                    @else
                                        <img src="{{ $item['src'] }}" alt="Gallery image" class="h-full w-full object-cover transition group-hover:scale-105">
                                    @endif
                                </button>
                            @endforeach
                        </div>
                    </section>
                @endif

                {{-- Reviews --}}
                @if ($reviews->isNotEmpty())
                    <section>
                        <h2 class="text-lg font-semibold text-gray-900">Reviews</h2>
                        <div class="mt-4 space-y-4">
                            @foreach ($reviews as $review)
                                <div class="rounded-lg border border-gray-100 p-4">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm font-semibold text-gray-900">{{ $review->customer }}</p>
                                        <div class="flex gap-0.5 text-amber-400">
                                            @for ($i = 0; $i < $review->rating; $i++)
                                                <x-icon name="star" class="size-3.5 fill-current" />
                                            @endfor
                                        </div>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-600">{{ $review->comment }}</p>
                                </div>
                            @endforeach
                        </div>
                    </section>
                @endif

                {{-- Enquiry form --}}
                <section id="enquire">
                    <h2 class="text-lg font-semibold text-gray-900">Send an Enquiry</h2>

                    @if (session('enquirySent'))
                        <p class="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            Your enquiry has been sent. The business will contact you soon.
                        </p>
                    @endif

                    <form method="POST" action="{{ route('businesses.enquire', $business->slug) }}" class="mt-4 space-y-4 rounded-xl border border-gray-100 p-5">
                        @csrf
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="text-xs font-medium text-gray-500">Your Name</label>
                                <input type="text" name="name" required value="{{ old('name') }}" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none">
                                @error('name') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                            </div>
                            <div>
                                <label class="text-xs font-medium text-gray-500">Phone Number</label>
                                <input type="text" name="phone" required value="{{ old('phone') }}" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none">
                                @error('phone') <p class="mt-1 text-xs text-red-500">{{ $message }}</p> @enderror
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-medium text-gray-500">Message</label>
                            <textarea name="message" rows="3" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none">{{ old('message') }}</textarea>
                        </div>
                        <button type="submit" class="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
                            <x-icon name="send" class="size-4" /> Send Enquiry
                        </button>
                    </form>
                </section>
            </div>

            {{-- Sidebar --}}
            <div class="space-y-6">
                <div class="flex flex-col gap-2 rounded-xl border border-gray-100 p-5">
                    @if ($business->phone)
                        <a href="tel:{{ $business->phone }}" class="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">
                            <x-icon name="phone" class="size-4" /> Call
                        </a>
                    @endif
                    @if ($business->whatsapp)
                        <a href="https://wa.me/{{ preg_replace('/\D/', '', $business->whatsapp) }}" target="_blank" rel="noopener" class="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                            <x-icon name="whatsapp" class="size-4" /> WhatsApp
                        </a>
                    @endif
                    <a href="#enquire" class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                        <x-icon name="mail" class="size-4" /> Get Quote
                    </a>
                </div>

                <div class="rounded-xl border border-gray-100 p-5">
                    <h3 class="text-sm font-semibold text-gray-900">Contact Details</h3>
                    <ul class="mt-3 space-y-3 text-sm text-gray-600">
                        @if ($business->address)
                            <li class="flex items-start gap-2">
                                <x-icon name="location" class="mt-0.5 size-4 shrink-0 text-gray-400" />
                                {{ $business->address }}, {{ $business->city }}, {{ $business->state }} {{ $business->postal_code }}
                            </li>
                        @endif
                        @if ($business->email)
                            <li class="flex items-center gap-2">
                                <x-icon name="mail" class="size-4 shrink-0 text-gray-400" />
                                <a href="mailto:{{ $business->email }}" class="hover:text-violet-600">{{ $business->email }}</a>
                            </li>
                        @endif
                        @if ($business->website)
                            <li class="flex items-center gap-2">
                                <x-icon name="globe" class="size-4 shrink-0 text-gray-400" />
                                <a href="{{ $business->website }}" target="_blank" rel="noopener" class="hover:text-violet-600">{{ $business->website }}</a>
                            </li>
                        @endif
                        @if ($business->hours)
                            <li class="flex items-center gap-2">
                                <x-icon name="clock" class="size-4 shrink-0 text-gray-400" />
                                {{ $business->hours }}
                            </li>
                        @endif
                    </ul>
                </div>

                @if ($business->lat && $business->lng)
                    <div class="overflow-hidden rounded-xl border border-gray-100">
                        <div id="business-map" class="h-56 w-full" data-lat="{{ $business->lat }}" data-lng="{{ $business->lng }}" data-name="{{ $business->name }}"></div>
                    </div>
                @endif
            </div>
        </div>
    </div>

    {{-- Lightbox --}}
    <div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/90 p-4">
        <button type="button" id="lightbox-close" class="absolute right-4 top-4 text-white">
            <x-icon name="close" class="size-7" />
        </button>
        <button type="button" id="lightbox-prev" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4">
            <x-icon name="arrow-left" class="size-7" />
        </button>
        <button type="button" id="lightbox-next" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4">
            <x-icon name="arrow-right" class="size-7" />
        </button>
        <div id="lightbox-content" class="max-h-full max-w-3xl w-full"></div>
    </div>

    @if ($business->lat && $business->lng)
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                var el = document.getElementById('business-map');
                if (!el || typeof L === 'undefined') return;
                var lat = parseFloat(el.dataset.lat);
                var lng = parseFloat(el.dataset.lng);
                var map = L.map(el).setView([lat, lng], 14);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                }).addTo(map);
                L.marker([lat, lng]).addTo(map).bindPopup(el.dataset.name);
            });
        </script>
    @endif

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var lightbox = document.getElementById('lightbox');
            var content = document.getElementById('lightbox-content');
            var closeBtn = document.getElementById('lightbox-close');
            var prevBtn = document.getElementById('lightbox-prev');
            var nextBtn = document.getElementById('lightbox-next');

            var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-trigger]'));
            var currentIndex = -1;

            function renderSlide(index) {
                var btn = triggers[index];
                var type = btn.dataset.type;
                var src = btn.dataset.src;
                content.innerHTML = '';

                if (type === 'video') {
                    if (src.includes('youtube.com') || src.includes('youtu.be')) {
                        var id = src.includes('youtu.be')
                            ? src.split('/').pop()
                            : new URL(src).searchParams.get('v');
                        var iframe = document.createElement('iframe');
                        iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
                        iframe.className = 'aspect-video w-full rounded-lg';
                        iframe.allow = 'autoplay; encrypted-media';
                        iframe.allowFullscreen = true;
                        content.appendChild(iframe);
                    } else {
                        var video = document.createElement('video');
                        video.src = src;
                        video.controls = true;
                        video.autoplay = true;
                        video.className = 'max-h-[80vh] w-full rounded-lg';
                        content.appendChild(video);
                    }
                } else {
                    var img = document.createElement('img');
                    img.src = src;
                    img.className = 'max-h-[80vh] w-full rounded-lg object-contain';
                    content.appendChild(img);
                }
            }

            function openLightbox(index) {
                currentIndex = index;
                renderSlide(currentIndex);
                var multiple = triggers.length > 1;
                prevBtn.classList.toggle('hidden', !multiple);
                nextBtn.classList.toggle('hidden', !multiple);
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
            }

            function showRelative(delta) {
                if (!triggers.length) return;
                currentIndex = (currentIndex + delta + triggers.length) % triggers.length;
                renderSlide(currentIndex);
            }

            function closeLightbox() {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                content.innerHTML = '';
                currentIndex = -1;
            }

            triggers.forEach(function (btn, index) {
                btn.addEventListener('click', function () {
                    openLightbox(index);
                });
            });

            prevBtn.addEventListener('click', function () { showRelative(-1); });
            nextBtn.addEventListener('click', function () { showRelative(1); });

            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', function (e) {
                if (currentIndex === -1) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showRelative(-1);
                if (e.key === 'ArrowRight') showRelative(1);
            });
        });
    </script>
</x-layout>
