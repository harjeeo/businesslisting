import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { Service } from "../data/dummy";

const statusTone: Record<Service["status"], "green" | "yellow" | "red"> = {
  Active: "green",
  Pending: "yellow",
  Rejected: "red",
};

export default function Services() {
  const { services, setServiceStatus } = useAdminData();

  const columns: Column<Service>[] = [
    {
      header: "Service",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.business}</p>
        </div>
      ),
    },
    { header: "Category", render: (row) => row.category },
    { header: "Starting Price", render: (row) => row.priceFrom },
    { header: "Added", render: (row) => row.createdAt },
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
                onClick={() => setServiceStatus(row.id, "Active")}
              />
              <ActionButton
                label="Reject"
                tone="danger"
                onClick={() => setServiceStatus(row.id, "Rejected")}
              />
            </>
          ) : (
            <ActionButton label="View" />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Review and manage service listings across all businesses"
        onSearch
      />
      <Table columns={columns} rows={services} />
    </div>
  );
}
