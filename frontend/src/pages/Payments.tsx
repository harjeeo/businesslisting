import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { transactions, type Transaction } from "../data/dummy";

const statusTone: Record<Transaction["status"], "green" | "yellow" | "red"> = {
  Success: "green",
  Pending: "yellow",
  Failed: "red",
};

const columns: Column<Transaction>[] = [
  {
    header: "Business",
    render: (row) => <span className="font-medium text-gray-900">{row.business}</span>,
  },
  { header: "Plan", render: (row) => row.plan },
  { header: "Amount", render: (row) => row.amount },
  { header: "Gateway", render: (row) => row.gateway },
  { header: "Date", render: (row) => row.date },
  {
    header: "Status",
    render: (row) => <Badge label={row.status} tone={statusTone[row.status]} />,
  },
];

export default function Payments() {
  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Subscription transaction history across India and Canada"
        onSearch
      />
      <Table columns={columns} rows={transactions} />
    </div>
  );
}
