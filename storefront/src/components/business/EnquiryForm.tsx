"use client";

import { useState } from "react";
import { SentIcon } from "hugeicons-react";

export default function EnquiryForm({ businessName }: { businessName: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-medium text-green-800">Enquiry sent!</p>
        <p className="mt-1 text-sm text-green-700">
          {businessName} will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
    >
      <h3 className="text-base font-semibold text-gray-900">
        Send an Enquiry to {businessName}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Your Name"
          className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
        <input
          type="tel"
          required
          placeholder="Phone Number"
          className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <input
        type="email"
        required
        placeholder="Email Address"
        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Product / Service of Interest"
          className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
        <input
          type="text"
          placeholder="Quantity (optional)"
          className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <textarea
        required
        rows={4}
        placeholder="Your message..."
        className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
      />

      <label className="block text-xs text-gray-500">
        Attachment (optional)
        <input type="file" className="mt-1.5 block w-full text-xs text-gray-500" />
      </label>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
      >
        <SentIcon size={16} />
        Send Enquiry
      </button>
    </form>
  );
}
