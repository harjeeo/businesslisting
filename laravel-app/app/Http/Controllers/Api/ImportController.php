<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Support\GmbAddressParser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImportController extends Controller
{
    public function gmb(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'listings' => ['required', 'array', 'min:1'],
            'listings.*.name' => ['required', 'string'],
            'listings.*.category' => ['nullable', 'string'],
            'listings.*.address' => ['nullable', 'string'],
            'listings.*.phone' => ['nullable', 'string'],
            'listings.*.website' => ['nullable', 'string'],
            'listings.*.hours' => ['nullable', 'string'],
            'listings.*.email' => ['nullable', 'string'],
            'listings.*.images' => ['nullable', 'array'],
            'listings.*.mapsUrl' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid payload', 'details' => $validator->errors()], 400);
        }

        $results = [];

        foreach ($request->input('listings') as $listing) {
            $parsedAddress = GmbAddressParser::parse($listing['address'] ?? '');
            $baseSlug = GmbAddressParser::slugify($listing['name']);
            $images = $listing['images'] ?? [];

            $data = [
                'name' => $listing['name'],
                'category' => $listing['category'] ?: 'Uncategorized',
                'address' => $parsedAddress['address'],
                'city' => $parsedAddress['city'],
                'state' => $parsedAddress['state'],
                'postal_code' => $parsedAddress['postal_code'],
                'country' => $parsedAddress['country'],
                'phone' => $listing['phone'] ?? '',
                'whatsapp' => $listing['phone'] ?? '',
                'email' => $listing['email'] ?? '',
                'website' => $listing['website'] ?? '',
                'hours' => $listing['hours'] ?? '',
                'gallery_urls' => $images,
                'cover_url' => $images[0] ?? '',
                'source' => 'GMB Import',
                'source_url' => $listing['mapsUrl'] ?? '',
            ];

            $existing = Business::where('slug', $baseSlug)->first();

            if ($existing) {
                $existing->update($data);
                $results[] = ['name' => $existing->name, 'status' => 'updated', 'slug' => $existing->slug];
            } else {
                $slug = $baseSlug;
                $n = 2;
                while (Business::where('slug', $slug)->exists()) {
                    $slug = "{$baseSlug}-{$n}";
                    $n++;
                }
                $created = Business::create([...$data, 'slug' => $slug, 'status' => 'Pending']);
                $results[] = ['name' => $created->name, 'status' => 'created', 'slug' => $created->slug];
            }
        }

        return response()->json([
            'imported' => count($results),
            'created' => count(array_filter($results, fn ($r) => $r['status'] === 'created')),
            'updated' => count(array_filter($results, fn ($r) => $r['status'] === 'updated')),
            'results' => $results,
        ], 201);
    }
}
