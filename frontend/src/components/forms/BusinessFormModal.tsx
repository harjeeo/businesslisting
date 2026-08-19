import { useState } from "react";
import Modal from "../ui/Modal";
import { TextField, SelectField } from "../ui/FormField";
import type { Business } from "../../data/dummy";

export default function BusinessFormModal({
  business,
  onClose,
  onSave,
}: {
  business?: Business;
  onClose: () => void;
  onSave: (data: Omit<Business, "id" | "leads" | "joined">) => void;
}) {
  const [name, setName] = useState(business?.name ?? "");
  const [category, setCategory] = useState(business?.category ?? "");
  const [country, setCountry] = useState<Business["country"]>(
    business?.country ?? "India"
  );
  const [city, setCity] = useState(business?.city ?? "");
  const [status, setStatus] = useState<Business["status"]>(
    business?.status ?? "Pending"
  );

  const isEdit = Boolean(business);

  const handleSubmit = () => {
    onSave({ name, category, country, city, status });
  };

  return (
    <Modal
      title={isEdit ? "Edit Business" : "Add Business"}
      subtitle={
        isEdit
          ? "Update this business's details"
          : "Add a new business to the marketplace"
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
            {isEdit ? "Save Changes" : "Add Business"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <TextField
          label="Business Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sharma Electronics"
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Electronics"
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Country"
            options={["India", "Canada"]}
            value={country}
            onChange={(e) => setCountry(e.target.value as Business["country"])}
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Ludhiana"
          />
        </div>
        <SelectField
          label="Status"
          options={["Pending", "Verified", "Suspended"]}
          value={status}
          onChange={(e) => setStatus(e.target.value as Business["status"])}
        />
      </div>
    </Modal>
  );
}
