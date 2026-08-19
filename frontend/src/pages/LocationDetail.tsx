import { useNavigate, useParams } from "react-router-dom";
import DetailPageLayout, {
  DetailCard,
  DetailRow,
} from "../components/ui/DetailPageLayout";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";

export default function LocationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { locations } = useAdminData();
  const location = locations.find((l) => l.id === Number(id));

  if (!location) {
    return (
      <DetailPageLayout title="Location not found">
        <p className="text-sm text-gray-500">
          This location may have been removed.
        </p>
      </DetailPageLayout>
    );
  }

  return (
    <DetailPageLayout
      title={location.city}
      subtitle={`${location.state}, ${location.country}`}
      badge={
        <Badge
          label={location.status}
          tone={location.status === "Active" ? "green" : "gray"}
        />
      }
      actions={
        <button
          type="button"
          onClick={() => navigate(`/locations/${location.id}/edit`)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Edit Location
        </button>
      }
    >
      <DetailCard title="Location Information">
        <DetailRow label="Country" value={location.country} />
        <DetailRow label="State / Province" value={location.state} />
        <DetailRow label="City" value={location.city} />
        <DetailRow label="Registered Businesses" value={location.businesses} />
        <DetailRow
          label="Status"
          value={
            <Badge
              label={location.status}
              tone={location.status === "Active" ? "green" : "gray"}
            />
          }
        />
      </DetailCard>
    </DetailPageLayout>
  );
}
