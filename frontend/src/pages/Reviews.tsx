import { StarIcon } from "hugeicons-react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { Review } from "../data/dummy";

const statusTone: Record<Review["status"], "green" | "yellow" | "red"> = {
  Approved: "green",
  Pending: "yellow",
  Rejected: "red",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          size={14}
          className={i < rating ? "fill-yellow-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { reviews, setReviewStatus } = useAdminData();

  const columns: Column<Review>[] = [
    {
      header: "Review",
      render: (row) => (
        <div className="max-w-xs">
          <p className="font-medium text-gray-900">{row.customer}</p>
          <p className="truncate text-xs text-gray-400">{row.comment}</p>
        </div>
      ),
    },
    { header: "Business", render: (row) => row.business },
    { header: "Rating", render: (row) => <Stars rating={row.rating} /> },
    { header: "Date", render: (row) => row.createdAt },
    {
      header: "Status",
      render: (row) => <Badge label={row.status} tone={statusTone[row.status]} />,
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          {row.status === "Pending" ? (
            <>
              <ActionButton
                label="Approve"
                onClick={() => setReviewStatus(row.id, "Approved")}
              />
              <ActionButton
                label="Reject"
                tone="danger"
                onClick={() => setReviewStatus(row.id, "Rejected")}
              />
            </>
          ) : (
            <ActionButton
              label="Remove"
              tone="danger"
              onClick={() => setReviewStatus(row.id, "Rejected")}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Reviews"
        subtitle="Moderate customer reviews and ratings"
        onSearch
      />
      <Table columns={columns} rows={reviews} />
    </div>
  );
}
