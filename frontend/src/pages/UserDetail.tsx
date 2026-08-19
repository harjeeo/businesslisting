import { useParams } from "react-router-dom";
import DetailPageLayout, {
  DetailCard,
  DetailRow,
} from "../components/ui/DetailPageLayout";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";

export default function UserDetail() {
  const { id } = useParams();
  const { users } = useAdminData();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <DetailPageLayout title="User not found">
        <p className="text-sm text-gray-500">This user may have been removed.</p>
      </DetailPageLayout>
    );
  }

  return (
    <DetailPageLayout
      title={user.name}
      subtitle={user.email}
      badge={<Badge label={user.role} tone="violet" />}
    >
      <DetailCard title="User Information">
        <DetailRow label="Full Name" value={user.name} />
        <DetailRow label="Email" value={user.email} />
        <DetailRow label="Role" value={<Badge label={user.role} tone="violet" />} />
        <DetailRow label="Country" value={user.country} />
        <DetailRow label="Joined" value={user.joined} />
        <DetailRow
          label="Status"
          value={
            <Badge label={user.status} tone={user.status === "Active" ? "green" : "red"} />
          }
        />
      </DetailCard>
    </DetailPageLayout>
  );
}
