import { useState, type FormEvent } from "react";
import { Modal } from "../Modal";
import { scadas } from "../../mockData/scadas";

interface ScadaConfigModalProps {
  onClose: () => void;
}

export function ScadaConfigModal({ onClose }: ScadaConfigModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleAddScada = (event: FormEvent) => {
    event.preventDefault();
    console.log("Add SCADA (mock):", { id: Number(id), name });
    setShowAddForm(false);
    setName("");
    setId("");
  };

  return (
    <Modal title="SCADA Screen Configuration" onClose={onClose} wide>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add SCADA
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {scadas.map((scada) => (
              <tr key={scada.id}>
                <td className="px-4 py-3 text-slate-800">{scada.id}</td>
                <td className="px-4 py-3 text-slate-600">{scada.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <Modal title="Add SCADA" onClose={() => setShowAddForm(false)}>
          <form onSubmit={handleAddScada} className="space-y-4">
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
                ID / Identifier
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
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
