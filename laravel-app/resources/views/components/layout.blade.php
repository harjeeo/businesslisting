<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'BizList' }} — Business Listing Marketplace</title>
    <meta name="description" content="{{ $description ?? 'Find verified businesses, products and services across India and Canada.' }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-white font-sans text-gray-900 antialiased">
    @include('partials.header')

    <main>
        {{ $slot }}
    </main>

    @include('partials.footer')
</body>
</html>
