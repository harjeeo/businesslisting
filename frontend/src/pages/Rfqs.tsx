import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";
import type { Rfq } from "../data/dummy";

const statusTone: Record<Rfq["status"], "yellow" | "violet" | "green"> = {
  Open: "yellow",
  Quoted: "violet",
  Closed: "green",
};

export default function Rfqs() {
  const { rfqs } = useAdminData();

  const columns: Column<Rfq>[] = [
    {
      header: "Product / Service",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.product}</p>
          <p className="text-xs text-gray-400">by {row.customer}</p>
        </div>
      ),
    },
    { header: "Quantity", render: (row) => row.quantity },
    { header: "Budget", render: (row) => row.budget },
    { header: "Quotes", render: (row) => row.quotes },
    { header: "Requested", render: (row) => row.createdAt },
    {
      header: "Status",
      render: (row) => <Badge label={row.status} tone={statusTone[row.status]} />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="RFQs"
        subtitle="Request for quotations submitted by customers"
        onSearch
      />
      <Table columns={columns} rows={rfqs} />
    </div>
  );
}
