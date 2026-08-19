import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "../components/ui/FormPageLayout";
import { TextField, SelectField } from "../components/ui/FormField";
import { useAdminData } from "../context/AdminDataContext";
import type { Business } from "../data/dummy";

export default function BusinessForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { businesses, addBusiness, updateBusiness } = useAdminData();
  const existing = id ? businesses.find((b) => b.id === Number(id)) : undefined;
  const isEdit = Boolean(existing);

  const [name, setName] = useState(existing?.name ?? "");
  const [category, setCategory] = useState(existing?.category ?? "");
  const [country, setCountry] = useState<Business["country"]>(
    existing?.country ?? "India"
  );
  const [city, setCity] = useState(existing?.city ?? "");
  const [status, setStatus] = useState<Business["status"]>(
    existing?.status ?? "Pending"
  );

  const handleSubmit = () => {
    const data = { name, category, country, city, status };
    if (existing) updateBusiness(existing.id, data);
    else addBusiness(data);
    navigate("/businesses");
  };

  return (
    <FormPageLayout
      title={isEdit ? "Edit Business" : "Add Business"}
      subtitle={
        isEdit
          ? "Update this business's details"
          : "Add a new business to the marketplace"
      }
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save Changes" : "Add Business"}
    >
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
    </FormPageLayout>
  );
}
