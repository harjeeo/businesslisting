<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        $origin = $request->headers->get('Origin');
        $allowed = array_filter(array_map('trim', explode(',', (string) env('CORS_ORIGIN', ''))));

        $allowOrigin = null;
        if (! $origin) {
            $allowOrigin = null;
        } elseif (in_array($origin, $allowed, true) || str_starts_with($origin, 'chrome-extension://')) {
            $allowOrigin = $origin;
        }

        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 204);
        } else {
            $response = $next($request);
        }

        if ($allowOrigin) {
            $response->headers->set('Access-Control-Allow-Origin', $allowOrigin);
            $response->headers->set('Vary', 'Origin');
        }
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

        return $response;
    }
}
