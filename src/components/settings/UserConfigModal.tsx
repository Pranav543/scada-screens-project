import { useState, type FormEvent } from "react";
import { Modal } from "../Modal";
import { scadas } from "../../mockData/scadas";
import { users, type UserRole } from "../../mockData/users";

interface UserConfigModalProps {
  onClose: () => void;
}

export function UserConfigModal({ onClose }: UserConfigModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("operator");
  const [selectedScadas, setSelectedScadas] = useState<number[]>([]);

  const toggleScada = (id: number) => {
    setSelectedScadas((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleAddUser = (event: FormEvent) => {
    event.preventDefault();
    console.log("Add user (mock):", {
      name,
      email,
      password,
      role,
      allowedScadas: selectedScadas,
    });
    setShowAddForm(false);
    setName("");
    setEmail("");
    setPassword("");
    setRole("operator");
    setSelectedScadas([]);
  };

  return (
    <Modal title="User Configuration" onClose={onClose} wide>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Assigned SCADAs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.map((user) => (
              <tr key={user.email}>
                <td className="px-4 py-3 text-slate-800">{user.name}</td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3 capitalize text-slate-600">
                  {user.role}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {user.allowedScadas.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <Modal title="Add User" onClose={() => setShowAddForm(false)}>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
              </select>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-700">
                SCADA Access
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {scadas.map((scada) => (
                  <label
                    key={scada.id}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedScadas.includes(scada.id)}
                      onChange={() => toggleScada(scada.id)}
                      className="rounded border-slate-300"
                    />
                    {scada.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Modal>
  );
}
