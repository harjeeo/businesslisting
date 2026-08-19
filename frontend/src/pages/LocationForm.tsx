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

  const handleSubmit = () => {
    const data = { country, state, city, status };
    if (existing) updateLocation(existing.id, data);
    else addLocation(data);
    navigate("/locations");
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
    </FormPageLayout>
  );
}
