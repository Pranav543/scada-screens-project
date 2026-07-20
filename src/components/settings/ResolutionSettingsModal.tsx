import { useState, type FormEvent } from "react";
import { Modal } from "../Modal";
import { scadas } from "../../mockData/scadas";

interface ResolutionSettingsModalProps {
  onClose: () => void;
}

const qualityOptions = [
  { value: "480p", label: "Low (480p)" },
  { value: "720p", label: "Medium (720p)" },
  { value: "1080p", label: "High (1080p)" },
];

const defaultResolutions = Object.fromEntries(
  scadas.map((scada) => [scada.id, "720p"]),
);

export function ResolutionSettingsModal({
  onClose,
}: ResolutionSettingsModalProps) {
  const [resolutions, setResolutions] = useState<Record<number, string>>(
    defaultResolutions,
  );

  const updateResolution = (scadaId: number, quality: string) => {
    setResolutions((prev) => ({ ...prev, [scadaId]: quality }));
  };

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    console.log("Resolution settings saved (mock):", resolutions);
    onClose();
  };

  return (
    <Modal title="Resolution Settings" onClose={onClose} wide>
      <p className="mb-4 text-sm text-slate-500">
        Configure display quality per SCADA screen. Each screen may run at a
        different resolution.
      </p>
      <form onSubmit={handleSave} className="space-y-5">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  SCADA Screen
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  Display Quality
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {scadas.map((scada) => (
                <tr key={scada.id}>
                  <td className="px-4 py-3 text-slate-800">{scada.name}</td>
                  <td className="px-4 py-3">
                    <select
                      value={resolutions[scada.id]}
                      onChange={(e) =>
                        updateResolution(scada.id, e.target.value)
                      }
                      className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                      aria-label={`Display quality for ${scada.name}`}
                    >
                      {qualityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
