import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { subscriptionPlans, type SubscriptionPlan } from "../data/dummy";

const columns: Column<SubscriptionPlan>[] = [
  {
    header: "Plan",
    render: (row) => <span className="font-medium text-gray-900">{row.name}</span>,
  },
  { header: "Price", render: (row) => row.price },
  { header: "Billing Cycle", render: (row) => row.billingCycle },
  { header: "Subscribers", render: (row) => row.subscribers },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Active" ? "green" : "gray"} />
    ),
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="Edit" />
      </div>
    ),
  },
];

export default function Subscriptions() {
  return (
    <div>
      <PageHeader
        title="Subscriptions"
        subtitle="Manage subscription plans available to businesses"
        addLabel="Add Plan"
      />
      <Table columns={columns} rows={subscriptionPlans} />
    </div>
  );
}
