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
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminUser["role"]>(existing?.role ?? "Admin");
  const [status, setStatus] = useState<AdminUser["status"]>(
    existing?.status ?? "Active"
  );
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const data = { name, email, role, status, password: password || undefined };
    setError("");
    try {
      if (existing) await updateAdminUser(existing.id, data);
      else await addAdminUser(data);
      navigate("/admin-users");
    } catch {
      setError("Could not save admin user. Please try again.");
    }
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
      <TextField
        label={isEdit ? "New Password (optional)" : "Temporary Password (optional)"}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={isEdit ? "Leave blank to keep current password" : "Defaults to password123 if left blank"}
        hint={isEdit ? undefined : "The admin should change this after first login."}
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
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </div>
      )}
    </FormPageLayout>
  );
}
