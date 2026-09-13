<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="{{ $class }}" {{ $attributes }}>
    @foreach ($shapes as $shape)
        @if ($shape['tag'] === 'circle')
            <circle cx="{{ $shape['cx'] }}" cy="{{ $shape['cy'] }}" r="{{ $shape['r'] }}" stroke="currentColor" stroke-width="1.5" />
        @else
            <path d="{{ $shape['d'] }}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        @endif
    @endforeach
</svg>
