import { useState } from "react";
import Modal from "../ui/Modal";
import { TextField, SelectField } from "../ui/FormField";
import type { LocationRow } from "../../data/dummy";

export default function LocationFormModal({
  location,
  onClose,
  onSave,
}: {
  location?: LocationRow;
  onClose: () => void;
  onSave: (data: Pick<LocationRow, "country" | "state" | "city" | "status">) => void;
}) {
  const [country, setCountry] = useState<LocationRow["country"]>(
    location?.country ?? "India"
  );
  const [state, setState] = useState(location?.state ?? "");
  const [city, setCity] = useState(location?.city ?? "");
  const [status, setStatus] = useState<LocationRow["status"]>(
    location?.status ?? "Active"
  );

  const isEdit = Boolean(location);

  const handleSubmit = () => {
    onSave({ country, state, city, status });
  };

  return (
    <Modal
      title={isEdit ? "Edit Location" : "Add Location"}
      subtitle={
        isEdit
          ? "Update this location's details"
          : "Add a country, state/province or city"
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
            {isEdit ? "Save Changes" : "Add Location"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <SelectField
          label="Country"
          options={["India", "Canada"]}
          value={country}
          onChange={(e) => setCountry(e.target.value as LocationRow["country"])}
        />
        <TextField
          label="State / Province"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="e.g. Punjab / Ontario"
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Ludhiana / Toronto"
        />
        <SelectField
          label="Status"
          options={["Active", "Inactive"]}
          value={status}
          onChange={(e) => setStatus(e.target.value as LocationRow["status"])}
        />
      </div>
    </Modal>
  );
}
