function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type="text"
        defaultValue={value}
        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
      />
    </label>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Platform-wide configuration for the marketplace
        </p>
      </div>

      <SettingsSection
        title="General"
        description="Basic platform information"
      >
        <SettingsField label="Platform Name" value="Business Listing Marketplace" />
        <SettingsField label="Support Email" value="support@example.com" />
      </SettingsSection>

      <SettingsSection
        title="Countries"
        description="Countries currently active on the platform"
      >
        <SettingsField label="Primary Country" value="India" />
        <SettingsField label="Secondary Country" value="Canada" />
      </SettingsSection>

      <SettingsSection
        title="Payments"
        description="Payment gateway configuration per country"
      >
        <SettingsField label="India Gateway" value="Razorpay" />
        <SettingsField label="Canada Gateway" value="Stripe" />
      </SettingsSection>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
