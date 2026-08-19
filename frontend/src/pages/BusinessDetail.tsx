import { useNavigate, useParams } from "react-router-dom";
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
      subtitle={business.category}
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

      <div className="mt-4">
        <DetailCard title="Business Information">
          <DetailRow label="Business Name" value={business.name} />
          <DetailRow label="Category" value={business.category} />
          <DetailRow label="Country" value={business.country} />
          <DetailRow label="City" value={business.city} />
          <DetailRow label="Joined" value={business.joined} />
          <DetailRow
            label="Status"
            value={<Badge label={business.status} tone={statusTone[business.status]} />}
          />
        </DetailCard>
      </div>
    </DetailPageLayout>
  );
}
