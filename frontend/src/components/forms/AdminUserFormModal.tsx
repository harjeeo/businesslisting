import { useState } from "react";
import Modal from "../ui/Modal";
import { TextField, SelectField } from "../ui/FormField";
import type { AdminUser } from "../../data/dummy";

export default function AdminUserFormModal({
  admin,
  onClose,
  onSave,
}: {
  admin?: AdminUser;
  onClose: () => void;
  onSave: (data: Pick<AdminUser, "name" | "email" | "role" | "status">) => void;
}) {
  const [name, setName] = useState(admin?.name ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [role, setRole] = useState<AdminUser["role"]>(
    admin?.role ?? "Admin"
  );
  const [status, setStatus] = useState<AdminUser["status"]>(
    admin?.status ?? "Active"
  );

  const isEdit = Boolean(admin);

  const handleSubmit = () => {
    onSave({ name, email, role, status });
  };

  return (
    <Modal
      title={isEdit ? "Edit Admin User" : "Invite Admin"}
      subtitle={
        isEdit
          ? "Update this admin user's details"
          : "Invite a new admin or moderator"
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
            {isEdit ? "Save Changes" : "Send Invite"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
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
      </div>
    </Modal>
  );
}
