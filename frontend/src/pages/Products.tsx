import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { Product } from "../data/dummy";

const statusTone: Record<Product["status"], "green" | "yellow" | "red"> = {
  Active: "green",
  Pending: "yellow",
  Rejected: "red",
};

export default function Products() {
  const { products, setProductStatus } = useAdminData();

  const columns: Column<Product>[] = [
    {
      header: "Product",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.business}</p>
        </div>
      ),
    },
    { header: "Category", render: (row) => row.category },
    { header: "Price", render: (row) => row.price },
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
                onClick={() => setProductStatus(row.id, "Active")}
              />
              <ActionButton
                label="Reject"
                tone="danger"
                onClick={() => setProductStatus(row.id, "Rejected")}
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
        title="Products"
        subtitle="Review and manage product listings across all businesses"
        onSearch
      />
      <Table columns={columns} rows={products} />
    </div>
  );
}
