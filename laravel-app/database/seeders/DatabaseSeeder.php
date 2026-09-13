<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Business;
use App\Models\Category;
use App\Models\Lead;
use App\Models\Location;
use App\Models\Product;
use App\Models\Review;
use App\Models\Rfq;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (AdminUser::count() > 0) {
            $this->command->info('Database already seeded, skipping.');

            return;
        }

        Business::insert([
            [
                'slug' => 'sharma-electronics', 'name' => 'Sharma Electronics', 'business_type' => 'Retailer',
                'category' => 'Electronics', 'sub_category' => 'Mobile Phones',
                'description' => 'Leading electronics retailer in Ludhiana offering LED lighting, CCTV systems and mobile accessories.',
                'established_year' => '2012', 'employees' => '11-50', 'country' => 'India', 'state' => 'Punjab',
                'city' => 'Ludhiana', 'address' => '123 Model Town Road', 'postal_code' => '141002',
                'lat' => 30.901, 'lng' => 75.8573, 'phone' => '+91 98765 43210', 'whatsapp' => '+91 98765 43210',
                'email' => 'contact@sharmaelectronics.in', 'website' => 'https://sharmaelectronics.in',
                'status' => 'Verified', 'leads' => 42, 'joined' => '2026-01-12',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'slug' => 'maple-web-studio', 'name' => 'Maple Web Studio', 'business_type' => 'Service Provider',
                'category' => 'IT Services', 'sub_category' => 'Web Development',
                'description' => 'Web design and development studio serving small businesses across Ontario.',
                'established_year' => '2018', 'employees' => '1-10', 'country' => 'Canada', 'state' => 'Ontario',
                'city' => 'Toronto', 'address' => '45 King Street West', 'postal_code' => 'M5H 1J8',
                'lat' => 43.6511, 'lng' => -79.3832, 'phone' => '+1 416 555 0134', 'whatsapp' => '+1 416 555 0134',
                'email' => 'hello@maplewebstudio.ca', 'website' => 'https://maplewebstudio.ca',
                'status' => 'Verified', 'leads' => 18, 'joined' => '2026-02-03',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'slug' => 'delhi-packaging-co', 'name' => 'Delhi Packaging Co.', 'business_type' => 'Manufacturer',
                'category' => 'Manufacturing', 'sub_category' => 'Packaging Materials',
                'description' => 'Manufacturer of corrugated boxes and packaging solutions for B2B clients.',
                'established_year' => '2005', 'employees' => '51-200', 'country' => 'India', 'state' => 'Delhi',
                'city' => 'Delhi', 'address' => 'Plot 22, Okhla Industrial Area', 'postal_code' => '110020',
                'lat' => 28.5355, 'lng' => 77.2725, 'phone' => '+91 98111 22334', 'whatsapp' => '+91 98111 22334',
                'email' => 'sales@delhipackaging.in', 'website' => '',
                'status' => 'Pending', 'leads' => 5, 'joined' => '2026-03-21',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'slug' => 'brampton-grocers', 'name' => 'Brampton Grocers', 'business_type' => 'Retailer',
                'category' => 'Retail', 'sub_category' => 'Grocery Store',
                'description' => 'Indian grocery store offering fresh produce and imported goods.',
                'established_year' => '2015', 'employees' => '11-50', 'country' => 'Canada', 'state' => 'Ontario',
                'city' => 'Brampton', 'address' => '88 Queen Street East', 'postal_code' => 'L6V 1B2',
                'lat' => 43.6852, 'lng' => -79.7594, 'phone' => '+1 905 555 0198', 'whatsapp' => '+1 905 555 0198',
                'email' => 'info@bramptongrocers.ca', 'website' => 'https://bramptongrocers.ca',
                'status' => 'Verified', 'leads' => 27, 'joined' => '2026-02-18',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'slug' => 'singh-interiors', 'name' => 'Singh Interiors', 'business_type' => 'Service Provider',
                'category' => 'Construction', 'sub_category' => 'Interior Design',
                'description' => 'Interior design and modular furniture for residential and commercial spaces.',
                'established_year' => '2010', 'employees' => '11-50', 'country' => 'India', 'state' => 'Chandigarh',
                'city' => 'Chandigarh', 'address' => 'SCO 145, Sector 34', 'postal_code' => '160022',
                'lat' => 30.7194, 'lng' => 76.7654, 'phone' => '+91 98140 55667', 'whatsapp' => '+91 98140 55667',
                'email' => 'studio@singhinteriors.in', 'website' => '',
                'status' => 'Suspended', 'leads' => 3, 'joined' => '2025-11-30',
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'slug' => 'toronto-legal-group', 'name' => 'Toronto Legal Group', 'business_type' => 'Professional',
                'category' => 'Professional Services', 'sub_category' => 'Immigration Law',
                'description' => 'Immigration and business law firm serving newcomers to Canada.',
                'established_year' => '2009', 'employees' => '11-50', 'country' => 'Canada', 'state' => 'Ontario',
                'city' => 'Toronto', 'address' => '200 Bay Street', 'postal_code' => 'M5J 2J1',
                'lat' => 43.6462, 'lng' => -79.3806, 'phone' => '+1 416 555 0177', 'whatsapp' => '+1 416 555 0177',
                'email' => 'info@torontolegalgroup.ca', 'website' => 'https://torontolegalgroup.ca',
                'status' => 'Pending', 'leads' => 9, 'joined' => '2026-04-02',
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);

        User::insert([
            ['name' => 'Rahul Verma', 'email' => 'rahul.verma@example.com', 'role' => 'Customer', 'country' => 'India', 'status' => 'Active', 'joined' => '2026-01-05', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Emily Johnson', 'email' => 'emily.j@example.com', 'role' => 'BusinessOwner', 'country' => 'Canada', 'status' => 'Active', 'joined' => '2026-02-14', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Amit Sharma', 'email' => 'amit.sharma@example.com', 'role' => 'BusinessOwner', 'country' => 'India', 'status' => 'Active', 'joined' => '2026-01-22', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Priya Kaur', 'email' => 'priya.kaur@example.com', 'role' => 'Customer', 'country' => 'Canada', 'status' => 'Blocked', 'joined' => '2026-03-09', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Michael Lee', 'email' => 'michael.lee@example.com', 'role' => 'Customer', 'country' => 'Canada', 'status' => 'Active', 'joined' => '2026-02-27', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Category::insert([
            ['name' => 'Electronics', 'parent' => null, 'businesses' => 128, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mobile Phones', 'parent' => 'Electronics', 'businesses' => 54, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Construction', 'parent' => null, 'businesses' => 76, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Contractors', 'parent' => 'Construction', 'businesses' => 31, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Professional Services', 'parent' => null, 'businesses' => 92, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lawyers', 'parent' => 'Professional Services', 'businesses' => 40, 'status' => 'Inactive', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Location::insert([
            ['country' => 'India', 'state' => 'Punjab', 'city' => 'Ludhiana', 'businesses' => 145, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'India', 'state' => 'Delhi', 'city' => 'New Delhi', 'businesses' => 320, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'India', 'state' => 'Chandigarh', 'city' => 'Chandigarh', 'businesses' => 88, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'Canada', 'state' => 'Ontario', 'city' => 'Toronto', 'businesses' => 210, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'Canada', 'state' => 'Ontario', 'city' => 'Brampton', 'businesses' => 97, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'Canada', 'state' => 'British Columbia', 'city' => 'Vancouver', 'businesses' => 64, 'status' => 'Inactive', 'created_at' => now(), 'updated_at' => now()],
        ]);

        $passwordHash = Hash::make('password123');
        AdminUser::insert([
            ['name' => 'Tanvir Kalsi', 'email' => 'tanvirkalsi93@gmail.com', 'password_hash' => $passwordHash, 'role' => 'SuperAdmin', 'status' => 'Active', 'last_active' => '2026-08-19', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Neha Gupta', 'email' => 'neha.gupta@example.com', 'password_hash' => $passwordHash, 'role' => 'Admin', 'status' => 'Active', 'last_active' => '2026-08-18', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'James Miller', 'email' => 'james.miller@example.com', 'password_hash' => $passwordHash, 'role' => 'Moderator', 'status' => 'Inactive', 'last_active' => '2026-08-01', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Product::insert([
            ['name' => 'LED Panel Light 24W', 'business' => 'Sharma Electronics', 'category' => 'Electronics', 'price' => '₹450', 'status' => 'Active', 'created_at' => '2026-05-02', 'updated_at' => '2026-05-02'],
            ['name' => 'CCTV Camera Kit (4ch)', 'business' => 'Sharma Electronics', 'category' => 'Electronics', 'price' => '₹8,999', 'status' => 'Pending', 'created_at' => '2026-07-14', 'updated_at' => '2026-07-14'],
            ['name' => 'Corrugated Shipping Box', 'business' => 'Delhi Packaging Co.', 'category' => 'Manufacturing', 'price' => '₹18/pc', 'status' => 'Active', 'created_at' => '2026-04-20', 'updated_at' => '2026-04-20'],
            ['name' => 'Organic Basmati Rice 5kg', 'business' => 'Brampton Grocers', 'category' => 'Retail', 'price' => 'CAD 22.99', 'status' => 'Active', 'created_at' => '2026-06-11', 'updated_at' => '2026-06-11'],
            ['name' => 'Modular Kitchen Cabinet', 'business' => 'Singh Interiors', 'category' => 'Construction', 'price' => 'On Request', 'status' => 'Rejected', 'created_at' => '2026-03-08', 'updated_at' => '2026-03-08'],
        ]);

        Service::insert([
            ['name' => 'Website Design & Development', 'business' => 'Maple Web Studio', 'category' => 'IT Services', 'price_from' => 'CAD 1,200', 'status' => 'Active', 'created_at' => '2026-02-10', 'updated_at' => '2026-02-10'],
            ['name' => 'Home Interior Consultation', 'business' => 'Singh Interiors', 'category' => 'Construction', 'price_from' => '₹2,000', 'status' => 'Active', 'created_at' => '2026-03-15', 'updated_at' => '2026-03-15'],
            ['name' => 'Immigration Document Filing', 'business' => 'Toronto Legal Group', 'category' => 'Professional Services', 'price_from' => 'CAD 350', 'status' => 'Pending', 'created_at' => '2026-07-01', 'updated_at' => '2026-07-01'],
            ['name' => 'Packaging Design Consultation', 'business' => 'Delhi Packaging Co.', 'category' => 'Manufacturing', 'price_from' => '₹5,000', 'status' => 'Active', 'created_at' => '2026-05-19', 'updated_at' => '2026-05-19'],
        ]);

        Lead::insert([
            ['business' => 'Sharma Electronics', 'customer' => 'Rahul Verma', 'interest' => 'CCTV Camera Kit (4ch)', 'status' => 'New', 'created_at' => '2026-08-15', 'updated_at' => '2026-08-15'],
            ['business' => 'Maple Web Studio', 'customer' => 'Emily Johnson', 'interest' => 'Website Design & Development', 'status' => 'InDiscussion', 'created_at' => '2026-08-10', 'updated_at' => '2026-08-10'],
            ['business' => 'Brampton Grocers', 'customer' => 'Michael Lee', 'interest' => 'Organic Basmati Rice 5kg', 'status' => 'Won', 'created_at' => '2026-07-28', 'updated_at' => '2026-07-28'],
            ['business' => 'Toronto Legal Group', 'customer' => 'Priya Kaur', 'interest' => 'Immigration Document Filing', 'status' => 'QuotationSent', 'created_at' => '2026-08-02', 'updated_at' => '2026-08-02'],
            ['business' => 'Delhi Packaging Co.', 'customer' => 'Amit Sharma', 'interest' => 'Corrugated Shipping Box', 'status' => 'Lost', 'created_at' => '2026-06-30', 'updated_at' => '2026-06-30'],
            ['business' => 'Singh Interiors', 'customer' => 'Neha Gupta', 'interest' => 'Modular Kitchen Cabinet', 'status' => 'Contacted', 'created_at' => '2026-08-17', 'updated_at' => '2026-08-17'],
        ]);

        Rfq::insert([
            ['product' => 'Corrugated Shipping Box', 'customer' => 'Rahul Verma', 'quantity' => '10,000 pcs', 'budget' => '₹1,80,000', 'quotes' => 3, 'status' => 'Open', 'created_at' => '2026-08-12', 'updated_at' => '2026-08-12'],
            ['product' => 'LED Panel Light 24W', 'customer' => 'Amit Sharma', 'quantity' => '500 units', 'budget' => '₹2,00,000', 'quotes' => 1, 'status' => 'Quoted', 'created_at' => '2026-08-05', 'updated_at' => '2026-08-05'],
            ['product' => 'Website Design & Development', 'customer' => 'Emily Johnson', 'quantity' => '1 project', 'budget' => 'CAD 1,500', 'quotes' => 2, 'status' => 'Closed', 'created_at' => '2026-07-20', 'updated_at' => '2026-07-20'],
            ['product' => 'Organic Basmati Rice 5kg', 'customer' => 'Michael Lee', 'quantity' => '200 kg', 'budget' => 'CAD 900', 'quotes' => 0, 'status' => 'Open', 'created_at' => '2026-08-16', 'updated_at' => '2026-08-16'],
        ]);

        Review::insert([
            ['business' => 'Sharma Electronics', 'customer' => 'Rahul Verma', 'rating' => 5, 'comment' => 'Great service and fast delivery.', 'status' => 'Approved', 'created_at' => '2026-07-01', 'updated_at' => '2026-07-01'],
            ['business' => 'Maple Web Studio', 'customer' => 'Emily Johnson', 'rating' => 4, 'comment' => 'Good work, minor delays.', 'status' => 'Approved', 'created_at' => '2026-06-18', 'updated_at' => '2026-06-18'],
            ['business' => 'Toronto Legal Group', 'customer' => 'Priya Kaur', 'rating' => 2, 'comment' => 'Slow response times.', 'status' => 'Pending', 'created_at' => '2026-08-14', 'updated_at' => '2026-08-14'],
            ['business' => 'Delhi Packaging Co.', 'customer' => 'Amit Sharma', 'rating' => 1, 'comment' => 'This looks like a fake/spam review.', 'status' => 'Pending', 'created_at' => '2026-08-17', 'updated_at' => '2026-08-17'],
            ['business' => 'Brampton Grocers', 'customer' => 'Michael Lee', 'rating' => 5, 'comment' => 'Best grocery store in the area!', 'status' => 'Approved', 'created_at' => '2026-05-25', 'updated_at' => '2026-05-25'],
        ]);

        $this->command->info('Seed complete.');
    }
}
