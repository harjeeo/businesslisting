import { useNavigate, useParams } from "react-router-dom";
import { Store01Icon, CallIcon, WhatsappIcon } from "hugeicons-react";
import DetailPageLayout, {
  DetailCard,
  DetailRow,
} from "../components/ui/DetailPageLayout";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";
import type { Business } from "../data/dummy";

const statusTone: Record<Business["status"], "green" | "yellow" | "red"> = {
  Verified: "green",
  Pending: "yellow",
  Suspended: "red",
};

export default function BusinessDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { businesses } = useAdminData();
  const business = businesses.find((b) => b.id === Number(id));

  if (!business) {
    return (
      <DetailPageLayout title="Business not found">
        <p className="text-sm text-gray-500">
          This business may have been removed.
        </p>
      </DetailPageLayout>
    );
  }

  return (
    <DetailPageLayout
      title={business.name}
      subtitle={`${business.category} · ${business.subCategory || "—"}`}
      badge={<Badge label={business.status} tone={statusTone[business.status]} />}
      actions={
        <button
          type="button"
          onClick={() => navigate(`/businesses/${business.id}/edit`)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Edit Business
        </button>
      }
    >
      {business.coverUrl && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-200">
          <img src={business.coverUrl} alt="" className="h-48 w-full object-cover" />
        </div>
      )}

      <div className="mb-4 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-violet-50 text-violet-600">
          {business.logoUrl ? (
            <img src={business.logoUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <Store01Icon size={28} />
          )}
        </span>
        <div>
          <p className="font-medium text-gray-900">{business.name}</p>
          <p className="text-sm text-gray-500">{business.businessType}</p>
          {business.description && (
            <p className="mt-1 text-sm text-gray-500">{business.description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Leads</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{business.leads}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Products</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">—</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Reviews</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">—</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailCard title="Business Information">
          <DetailRow label="Business Type" value={business.businessType} />
          <DetailRow label="Category" value={business.category} />
          <DetailRow label="Sub-category" value={business.subCategory || "—"} />
          <DetailRow label="Established" value={business.establishedYear || "—"} />
          <DetailRow label="Employees" value={business.employees || "—"} />
          <DetailRow label="Joined" value={business.joined} />
          <DetailRow
            label="Status"
            value={<Badge label={business.status} tone={statusTone[business.status]} />}
          />
        </DetailCard>

        <DetailCard title="Location & Contact">
          <DetailRow label="Address" value={business.address || "—"} />
          <DetailRow label="City" value={business.city} />
          <DetailRow label="State" value={business.state || "—"} />
          <DetailRow label="Country" value={business.country} />
          <DetailRow label="Postal Code" value={business.postalCode || "—"} />
          <DetailRow
            label="Phone"
            value={
              business.phone ? (
                <span className="flex items-center justify-end gap-1.5">
                  <CallIcon size={14} /> {business.phone}
                </span>
              ) : (
                "—"
              )
            }
          />
          <DetailRow
            label="WhatsApp"
            value={
              business.whatsapp ? (
                <span className="flex items-center justify-end gap-1.5">
                  <WhatsappIcon size={14} /> {business.whatsapp}
                </span>
              ) : (
                "—"
              )
            }
          />
          <DetailRow label="Email" value={business.email || "—"} />
          <DetailRow label="Website" value={business.website || "—"} />
        </DetailCard>
      </div>

      {business.galleryUrls.length > 0 && (
        <div className="mt-4">
          <DetailCard title="Gallery">
            <div className="flex flex-wrap gap-3">
              {business.galleryUrls.map((url, i) => (
                <img
                  key={url + i}
                  src={url}
                  alt=""
                  className="h-24 w-24 rounded-lg object-cover"
                />
              ))}
            </div>
          </DetailCard>
        </div>
      )}
    </DetailPageLayout>
  );
}
