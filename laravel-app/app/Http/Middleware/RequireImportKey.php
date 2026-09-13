<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireImportKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $configured = env('IMPORT_API_KEY');

        if (! $configured) {
            return response()->json([
                'error' => 'Import is not configured. Set IMPORT_API_KEY in the .env.',
            ], 503);
        }

        if ($request->header('X-Api-Key') !== $configured) {
            return response()->json(['error' => 'Invalid or missing API key'], 401);
        }

        return $next($request);
    }
}
