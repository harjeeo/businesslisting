import { useNavigate, useParams } from "react-router-dom";
import DetailPageLayout, {
  DetailCard,
  DetailRow,
} from "../components/ui/DetailPageLayout";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";
import type { AdminUser } from "../data/dummy";

const roleTone: Record<AdminUser["role"], "violet" | "gray"> = {
  "Super Admin": "violet",
  Admin: "gray",
  Moderator: "gray",
};

export default function AdminUserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { adminUsers } = useAdminData();
  const admin = adminUsers.find((a) => a.id === Number(id));

  if (!admin) {
    return (
      <DetailPageLayout title="Admin user not found">
        <p className="text-sm text-gray-500">
          This admin account may have been removed.
        </p>
      </DetailPageLayout>
    );
  }

  return (
    <DetailPageLayout
      title={admin.name}
      subtitle={admin.email}
      badge={<Badge label={admin.role} tone={roleTone[admin.role]} />}
      actions={
        <button
          type="button"
          onClick={() => navigate(`/admin-users/${admin.id}/edit`)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Edit Admin
        </button>
      }
    >
      <DetailCard title="Admin Information">
        <DetailRow label="Full Name" value={admin.name} />
        <DetailRow label="Email" value={admin.email} />
        <DetailRow label="Role" value={<Badge label={admin.role} tone={roleTone[admin.role]} />} />
        <DetailRow label="Last Active" value={admin.lastActive} />
        <DetailRow
          label="Status"
          value={
            <Badge label={admin.status} tone={admin.status === "Active" ? "green" : "gray"} />
          }
        />
      </DetailCard>
    </DetailPageLayout>
  );
}
