import { useNavigate, useParams } from "react-router-dom";
import DetailPageLayout, {
  DetailCard,
  DetailRow,
} from "../components/ui/DetailPageLayout";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";

export default function CategoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useAdminData();
  const category = categories.find((c) => c.id === Number(id));

  if (!category) {
    return (
      <DetailPageLayout title="Category not found">
        <p className="text-sm text-gray-500">
          This category may have been removed.
        </p>
      </DetailPageLayout>
    );
  }

  const subCategories = categories.filter((c) => c.parent === category.name);

  return (
    <DetailPageLayout
      title={category.name}
      subtitle={category.parent ? `Sub-category of ${category.parent}` : "Top-level category"}
      badge={
        <Badge
          label={category.status}
          tone={category.status === "Active" ? "green" : "gray"}
        />
      }
      actions={
        <button
          type="button"
          onClick={() => navigate(`/categories/${category.id}/edit`)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Edit Category
        </button>
      }
    >
      <DetailCard title="Category Information">
        <DetailRow label="Name" value={category.name} />
        <DetailRow label="Parent" value={category.parent ?? "None (top-level)"} />
        <DetailRow label="Businesses" value={category.businesses} />
        <DetailRow
          label="Status"
          value={
            <Badge
              label={category.status}
              tone={category.status === "Active" ? "green" : "gray"}
            />
          }
        />
      </DetailCard>

      {subCategories.length > 0 && (
        <div className="mt-4">
          <DetailCard title="Sub-categories">
            {subCategories.map((sub) => (
              <DetailRow key={sub.id} label={sub.name} value={`${sub.businesses} businesses`} />
            ))}
          </DetailCard>
        </div>
      )}
    </DetailPageLayout>
  );
}
