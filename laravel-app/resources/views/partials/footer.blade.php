<footer class="border-t border-gray-100 bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div class="col-span-2 sm:col-span-1">
                <div class="flex items-center gap-2 text-lg font-bold text-gray-900">
                    <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                        <x-icon name="store" class="size-4" />
                    </span>
                    BizList
                </div>
                <p class="mt-3 text-sm text-gray-500">
                    The business listing marketplace connecting customers with verified businesses across India and Canada.
                </p>
                <div class="mt-4 flex items-center gap-3 text-gray-400">
                    <a href="#" class="hover:text-violet-600"><x-icon name="facebook" class="size-5" /></a>
                    <a href="#" class="hover:text-violet-600"><x-icon name="instagram" class="size-5" /></a>
                    <a href="#" class="hover:text-violet-600"><x-icon name="linkedin" class="size-5" /></a>
                    <a href="#" class="hover:text-violet-600"><x-icon name="twitter" class="size-5" /></a>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-semibold text-gray-900">Company</h4>
                <ul class="mt-3 space-y-2 text-sm text-gray-500">
                    <li><a href="#" class="hover:text-violet-600">About Us</a></li>
                    <li><a href="#" class="hover:text-violet-600">Contact</a></li>
                    <li><a href="#" class="hover:text-violet-600">Careers</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-sm font-semibold text-gray-900">For Businesses</h4>
                <ul class="mt-3 space-y-2 text-sm text-gray-500">
                    <li><a href="{{ route('businesses.index') }}" class="hover:text-violet-600">List Your Business</a></li>
                    <li><a href="#" class="hover:text-violet-600">Pricing</a></li>
                    <li><a href="#" class="hover:text-violet-600">Success Stories</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-sm font-semibold text-gray-900">Legal</h4>
                <ul class="mt-3 space-y-2 text-sm text-gray-500">
                    <li><a href="#" class="hover:text-violet-600">Privacy Policy</a></li>
                    <li><a href="#" class="hover:text-violet-600">Terms of Service</a></li>
                </ul>
            </div>
        </div>

        <div class="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
            &copy; {{ date('Y') }} BizList. All rights reserved. Serving India &amp; Canada.
        </div>
    </div>
</footer>
