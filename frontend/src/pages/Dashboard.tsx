import {
  Building06Icon,
  UserMultipleIcon,
  Target01Icon,
  Package01Icon,
} from "hugeicons-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAdminData } from "../context/AdminDataContext";
import { growthData, type Lead } from "../data/dummy";

const COLOR_USERS = "#2a78d6";
const COLOR_BUSINESSES = "#eb6834";
const COLOR_BAR = "#2a78d6";
const GRID = "#f0efec";
const AXIS_TEXT = "#8a8a86";

const leadStatusOrder: Lead["status"][] = [
  "New",
  "Contacted",
  "In Discussion",
  "Quotation Sent",
  "Won",
  "Lost",
];

export default function Dashboard() {
  const { businesses, users, leads, products } = useAdminData();

  const stats = [
    { label: "Total Businesses", value: businesses.length, icon: Building06Icon },
    { label: "Total Users", value: users.length, icon: UserMultipleIcon },
    { label: "Total Leads", value: leads.length, icon: Target01Icon },
    { label: "Total Products", value: products.length, icon: Package01Icon },
  ];

  const leadsByStatus = leadStatusOrder.map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
  }));

  const categoryTotals = new Map<string, number>();
  businesses.forEach((b) => {
    categoryTotals.set(b.category, (categoryTotals.get(b.category) ?? 0) + 1);
  });
  const topCategories = Array.from(categoryTotals, ([category, count]) => ({
    category,
    count,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Icon size={22} />
            </span>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            User &amp; Business Growth
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData} margin={{ left: -20 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: AXIS_TEXT }}
                axisLine={{ stroke: GRID }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: AXIS_TEXT }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="users"
                name="Users"
                stroke={COLOR_USERS}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="businesses"
                name="Businesses"
                stroke={COLOR_BUSINESSES}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Leads by Status
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={leadsByStatus} margin={{ left: -20 }}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 11, fill: AXIS_TEXT }}
                axisLine={{ stroke: GRID }}
                tickLine={false}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: AXIS_TEXT }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" name="Leads" fill={COLOR_BAR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Businesses by Category
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topCategories} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid stroke={GRID} horizontal={false} />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 12, fill: AXIS_TEXT }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 12, fill: AXIS_TEXT }}
              axisLine={false}
              tickLine={false}
              width={140}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />
            <Bar dataKey="count" name="Businesses" fill={COLOR_BAR} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
