import { SearchList01Icon, Comment01Icon, Agreement01Icon } from "hugeicons-react";

const steps = [
  {
    icon: SearchList01Icon,
    title: "Search & Compare",
    description: "Search businesses, products or services by category and location, then compare verified listings.",
  },
  {
    icon: Comment01Icon,
    title: "Send an Enquiry",
    description: "Contact businesses directly or submit an RFQ to get quotes from multiple sellers at once.",
  },
  {
    icon: Agreement01Icon,
    title: "Connect & Close",
    description: "Compare quotes, chat with businesses, and close the deal with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
          <p className="mt-1 text-sm text-gray-500">Three simple steps to find what you need</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white">
                <step.icon size={26} />
              </div>
              <span className="mt-3 block text-xs font-semibold text-violet-500">
                STEP {i + 1}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
