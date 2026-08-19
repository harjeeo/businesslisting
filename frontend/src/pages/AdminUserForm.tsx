import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPageLayout from "../components/ui/FormPageLayout";
import { TextField, SelectField } from "../components/ui/FormField";
import { useAdminData } from "../context/AdminDataContext";
import type { AdminUser } from "../data/dummy";

export default function AdminUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { adminUsers, addAdminUser, updateAdminUser } = useAdminData();
  const existing = id ? adminUsers.find((a) => a.id === Number(id)) : undefined;
  const isEdit = Boolean(existing);

  const [name, setName] = useState(existing?.name ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [role, setRole] = useState<AdminUser["role"]>(existing?.role ?? "Admin");
  const [status, setStatus] = useState<AdminUser["status"]>(
    existing?.status ?? "Active"
  );

  const handleSubmit = () => {
    const data = { name, email, role, status };
    if (existing) updateAdminUser(existing.id, data);
    else addAdminUser(data);
    navigate("/admin-users");
  };

  return (
    <FormPageLayout
      title={isEdit ? "Edit Admin User" : "Invite Admin"}
      subtitle={
        isEdit
          ? "Update this admin user's details"
          : "Invite a new admin or moderator"
      }
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Save Changes" : "Send Invite"}
    >
      <TextField
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Neha Gupta"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e.g. neha@example.com"
      />
      <SelectField
        label="Role"
        options={["Super Admin", "Admin", "Moderator"]}
        value={role}
        onChange={(e) => setRole(e.target.value as AdminUser["role"])}
      />
      <SelectField
        label="Status"
        options={["Active", "Inactive"]}
        value={status}
        onChange={(e) => setStatus(e.target.value as AdminUser["status"])}
      />
    </FormPageLayout>
  );
}
