import { useState } from "react";
import Modal from "../ui/Modal";
import { TextField, SelectField } from "../ui/FormField";
import type { Category } from "../../data/dummy";

export default function CategoryFormModal({
  category,
  parentOptions,
  onClose,
  onSave,
}: {
  category?: Category;
  parentOptions: string[];
  onClose: () => void;
  onSave: (data: Pick<Category, "name" | "parent" | "status">) => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [parent, setParent] = useState(category?.parent ?? "None");
  const [status, setStatus] = useState<Category["status"]>(
    category?.status ?? "Active"
  );

  const isEdit = Boolean(category);

  const handleSubmit = () => {
    onSave({ name, parent: parent === "None" ? null : parent, status });
  };

  return (
    <Modal
      title={isEdit ? "Edit Category" : "Add Category"}
      subtitle={
        isEdit
          ? "Update this category's details"
          : "Create a new category or sub-category"
      }
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            {isEdit ? "Save Changes" : "Add Category"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
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
      </div>
    </Modal>
  );
}
