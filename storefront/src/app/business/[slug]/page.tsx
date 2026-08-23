import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft01Icon,
  CheckmarkBadge01Icon,
  StarIcon,
  CallIcon,
  WhatsappIcon,
  MailAtSign01Icon,
  GlobalIcon,
  Location01Icon,
  Clock01Icon,
  SentIcon,
} from "hugeicons-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/business/EnquiryForm";
import MapSection from "@/components/business/MapSection";
import { businessDetails, getBusinessBySlug } from "@/data/dummy";

export function generateStaticParams() {
  return businessDetails.map((b) => ({ slug: b.slug }));
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft01Icon size={16} />
          Back to search
        </Link>

        {/* Cover + identity */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="h-32 bg-gradient-to-r from-violet-600 to-violet-400 sm:h-40" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <span className="-mt-16 flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-violet-50 text-4xl shadow-sm">
                {business.logo}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-gray-900">{business.name}</h1>
                  {business.verified && (
                    <CheckmarkBadge01Icon size={20} className="text-violet-600" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {business.category} · {business.subCategory}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm">
                  <StarIcon size={15} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-700">{business.rating}</span>
                  <span className="text-gray-400">({business.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <CallIcon size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
              >
                <WhatsappIcon size={16} />
                WhatsApp
              </a>
              <a
                href="#enquiry"
                className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              >
                <SentIcon size={16} />
                Get Quote
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {business.description}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-gray-400">Business Type</p>
                  <p className="font-medium text-gray-800">{business.businessType}</p>
                </div>
                <div>
                  <p className="text-gray-400">Established</p>
                  <p className="font-medium text-gray-800">{business.establishedYear}</p>
                </div>
                <div>
                  <p className="text-gray-400">Employees</p>
                  <p className="font-medium text-gray-800">{business.employees}</p>
                </div>
              </div>
            </section>

            {business.products.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">Products</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {business.products.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-lg border border-gray-100 p-4 text-center"
                    >
                      <div className="text-3xl">{p.image}</div>
                      <p className="mt-2 text-sm font-medium text-gray-800">{p.name}</p>
                      <p className="text-sm text-violet-600">{p.price}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {business.services.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-semibold text-gray-900">Services</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {business.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-violet-50 px-3 py-1.5 text-sm text-violet-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-gray-900">Gallery</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {business.gallery.map((g, i) => (
                  <div
                    key={i}
                    className="flex h-24 w-24 items-center justify-center rounded-lg bg-violet-50 text-4xl"
                  >
                    {g}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-gray-900">
                Reviews &amp; Ratings
              </h2>
              <div className="mt-4 space-y-4">
                {business.reviewsList.map((r) => (
                  <div key={r.name} className="border-b border-gray-50 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{r.name}</p>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          size={13}
                          className={
                            i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm text-gray-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-base font-semibold text-gray-900">FAQs</h2>
              <div className="mt-4 space-y-4">
                {business.faqs.map((f) => (
                  <div key={f.question}>
                    <p className="text-sm font-medium text-gray-800">{f.question}</p>
                    <p className="mt-1 text-sm text-gray-500">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div id="enquiry">
              <EnquiryForm businessName={business.name} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">Contact Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5 text-gray-600">
                  <Location01Icon size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>
                    {business.address}, {business.city}, {business.state}, {business.country}{" "}
                    {business.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Clock01Icon size={16} className="shrink-0 text-gray-400" />
                  <span>{business.hours}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <MailAtSign01Icon size={16} className="shrink-0 text-gray-400" />
                  <a href={`mailto:${business.email}`} className="hover:text-violet-600">
                    {business.email}
                  </a>
                </div>
                {business.website && (
                  <div className="flex items-center gap-2.5 text-gray-600">
                    <GlobalIcon size={16} className="shrink-0 text-gray-400" />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:text-violet-600"
                    >
                      {business.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Location</h3>
              <MapSection lat={business.lat} lng={business.lng} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
