import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { cmsPages, banners, faqs, blogPosts } from "../data/dummy";
import type { CmsPage, Banner, Faq, BlogPost } from "../data/dummy";

const tabs = ["Pages", "Banners", "FAQs", "Blog"] as const;
type Tab = (typeof tabs)[number];

const pageColumns: Column<CmsPage>[] = [
  {
    header: "Title",
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.title}</p>
        <p className="text-xs text-gray-400">{row.slug}</p>
      </div>
    ),
  },
  { header: "Last Updated", render: (row) => row.updatedAt },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Published" ? "green" : "gray"} />
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

const bannerColumns: Column<Banner>[] = [
  {
    header: "Title",
    render: (row) => <span className="font-medium text-gray-900">{row.title}</span>,
  },
  { header: "Position", render: (row) => row.position },
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
        <ActionButton label="Delete" tone="danger" />
      </div>
    ),
  },
];

const faqColumns: Column<Faq>[] = [
  {
    header: "Question",
    render: (row) => (
      <div className="max-w-md">
        <p className="font-medium text-gray-900">{row.question}</p>
        <p className="truncate text-xs text-gray-400">{row.answer}</p>
      </div>
    ),
  },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Published" ? "green" : "gray"} />
    ),
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="Edit" />
        <ActionButton label="Delete" tone="danger" />
      </div>
    ),
  },
];

const blogColumns: Column<BlogPost>[] = [
  {
    header: "Title",
    render: (row) => <span className="font-medium text-gray-900">{row.title}</span>,
  },
  { header: "Author", render: (row) => row.author },
  { header: "Published", render: (row) => row.publishedAt },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Published" ? "green" : "gray"} />
    ),
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="Edit" />
        <ActionButton label="Delete" tone="danger" />
      </div>
    ),
  },
];

const addLabels: Record<Tab, string> = {
  Pages: "Add Page",
  Banners: "Add Banner",
  FAQs: "Add FAQ",
  Blog: "Add Post",
};

export default function Cms() {
  const [tab, setTab] = useState<Tab>("Pages");

  return (
    <div>
      <PageHeader
        title="CMS"
        subtitle="Manage static pages, banners, FAQs and blog content"
        addLabel={addLabels[tab]}
      />

      <div className="mb-4 flex gap-1 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Pages" && <Table columns={pageColumns} rows={cmsPages} />}
      {tab === "Banners" && <Table columns={bannerColumns} rows={banners} />}
      {tab === "FAQs" && <Table columns={faqColumns} rows={faqs} />}
      {tab === "Blog" && <Table columns={blogColumns} rows={blogPosts} />}
    </div>
  );
}
