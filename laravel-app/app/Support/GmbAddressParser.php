<?php

namespace App\Support;

class GmbAddressParser
{
    public static function slugify(string $name): string
    {
        $slug = strtolower(trim($name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
        $slug = trim($slug, '-');

        return $slug;
    }

    /**
     * Best-effort split of a free-text Google Maps address into structured
     * fields. GMB addresses are typically "<street>, <city>, <state>
     * <postal>, <country>" but the exact shape varies — treat this as a
     * starting point; the admin should review/correct imported businesses.
     *
     * @return array{address: string, city: string, state: string, postal_code: string, country: string}
     */
    public static function parse(string $raw): array
    {
        $parts = array_values(array_filter(array_map('trim', explode(',', $raw)), fn ($s) => $s !== ''));

        $country = '';
        if (count($parts) && preg_match('/india/i', $parts[count($parts) - 1])) {
            $country = 'India';
            array_pop($parts);
        } elseif (count($parts) && preg_match('/canada/i', $parts[count($parts) - 1])) {
            $country = 'Canada';
            array_pop($parts);
        }

        $state = '';
        $postalCode = '';
        if (count($parts)) {
            $last = $parts[count($parts) - 1];
            if (preg_match('/\b(\d{6})\b/', $last, $inMatch)) {
                $postalCode = $inMatch[1];
                $state = trim(str_replace($inMatch[0], '', $last));
                array_pop($parts);
                if (! $country) {
                    $country = 'India';
                }
            } elseif (preg_match('/\b([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d)\b/', $last, $caMatch)) {
                $postalCode = strtoupper($caMatch[1]);
                $state = trim(str_replace($caMatch[0], '', $last));
                array_pop($parts);
                if (! $country) {
                    $country = 'Canada';
                }
            }
        }

        $city = count($parts) ? array_pop($parts) : '';
        $address = implode(', ', $parts);

        return [
            'address' => $address,
            'city' => $city,
            'state' => $state,
            'postal_code' => $postalCode,
            'country' => $country ?: 'India',
        ];
    }
}
