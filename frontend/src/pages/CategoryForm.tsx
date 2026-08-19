import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "../components/ui/FormPageLayout";
import { TextField, SelectField } from "../components/ui/FormField";
import { useAdminData } from "../context/AdminDataContext";
import type { Category } from "../data/dummy";

export default function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories, addCategory, updateCategory } = useAdminData();
  const existing = id ? categories.find((c) => c.id === Number(id)) : undefined;
  const isEdit = Boolean(existing);

  const parentOptions = categories
    .filter((c) => c.parent === null && c.name !== existing?.name)
    .map((c) => c.name);

  const [name, setName] = useState(existing?.name ?? "");
  const [parent, setParent] = useState(existing?.parent ?? "None");
  const [status, setStatus] = useState<Category["status"]>(
    existing?.status ?? "Active"
  );

  const handleSubmit = () => {
    const data = { name, parent: parent === "None" ? null : parent, status };
    if (existing) updateCategory(existing.id, data);
    else addCategory(data);
    navigate("/categories");
  };

  return (
    <FormPageLayout
      title={isEdit ? "Edit Category" : "Add Category"}
      subtitle={
        isEdit
          ? "Update this category's details"
          : "Create a new category or sub-category"
      }
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save Changes" : "Add Category"}
    >
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Mobile Phones"
      />
      <SelectField
        label="Parent Category"
        options={["None", ...parentOptions]}
        value={parent ?? "None"}
        onChange={(e) => setParent(e.target.value)}
      />
      <SelectField
        label="Status"
        options={["Active", "Inactive"]}
        value={status}
        onChange={(e) => setStatus(e.target.value as Category["status"])}
      />
    </FormPageLayout>
  );
}
