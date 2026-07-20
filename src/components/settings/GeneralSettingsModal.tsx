import { useState, type FormEvent } from "react";
import { Modal } from "../Modal";

interface GeneralSettingsModalProps {
  onClose: () => void;
}

const logoutOptions = [
  { value: "5", label: "5 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "60 minutes" },
];

export function GeneralSettingsModal({ onClose }: GeneralSettingsModalProps) {
  const [companyName, setCompanyName] = useState("Orchid Pharma");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [autoLogout, setAutoLogout] = useState("15");

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    console.log("General settings saved (mock):", {
      companyName,
      theme,
      autoLogout,
    });
    onClose();
  };

  return (
    <Modal title="General Settings" onClose={onClose}>
      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label
            htmlFor="company-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Site / Company Display Name
          </label>
          <input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Theme
          </span>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
              />
              Light
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
              />
              Dark
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="auto-logout"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Auto-Logout Timer
          </label>
          <select
            id="auto-logout"
            value={autoLogout}
            onChange={(e) => setAutoLogout(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            {logoutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
