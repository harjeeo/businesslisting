import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "../components/ui/FormPageLayout";
import { TextField, SelectField } from "../components/ui/FormField";
import { useAdminData } from "../context/AdminDataContext";
import type { LocationRow } from "../data/dummy";

export default function LocationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { locations, addLocation, updateLocation } = useAdminData();
  const existing = id ? locations.find((l) => l.id === Number(id)) : undefined;
  const isEdit = Boolean(existing);

  const [country, setCountry] = useState<LocationRow["country"]>(
    existing?.country ?? "India"
  );
  const [state, setState] = useState(existing?.state ?? "");
  const [city, setCity] = useState(existing?.city ?? "");
  const [status, setStatus] = useState<LocationRow["status"]>(
    existing?.status ?? "Active"
  );

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const data = { country, state, city, status };
    setError("");
    try {
      if (existing) await updateLocation(existing.id, data);
      else await addLocation(data);
      navigate("/locations");
    } catch {
      setError("Could not save location. Please try again.");
    }
  };

  return (
    <FormPageLayout
      title={isEdit ? "Edit Location" : "Add Location"}
      subtitle={
        isEdit
          ? "Update this location's details"
          : "Add a country, state/province or city"
      }
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save Changes" : "Add Location"}
    >
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
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </div>
      )}
    </FormPageLayout>
  );
}
