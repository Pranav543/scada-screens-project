import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GeneralSettingsModal } from "./settings/GeneralSettingsModal";
import { ResolutionSettingsModal } from "./settings/ResolutionSettingsModal";
import { ScadaConfigModal } from "./settings/ScadaConfigModal";
import { UserConfigModal } from "./settings/UserConfigModal";

type SettingsView =
  | "user-config"
  | "scada-config"
  | "resolution"
  | "general"
  | null;

interface SettingsMenuProps {
  onLogout: () => void;
}

export function SettingsMenu({ onLogout }: SettingsMenuProps) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeView, setActiveView] = useState<SettingsView>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openView = (view: SettingsView) => {
    setOpen(false);
    setActiveView(view);
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
    onLogout();
  };

  const menuItems = [
    { id: "user-config" as const, label: "User Configuration" },
    { id: "scada-config" as const, label: "SCADA Screen Configuration" },
    { id: "resolution" as const, label: "Resolution Settings" },
    { id: "general" as const, label: "General Settings" },
  ];

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Settings"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openView(item.id)}
                className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
              >
                {item.label}
              </button>
            ))}
            <div className="my-1 border-t border-slate-100" />
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {activeView === "user-config" && (
        <UserConfigModal onClose={() => setActiveView(null)} />
      )}
      {activeView === "scada-config" && (
        <ScadaConfigModal onClose={() => setActiveView(null)} />
      )}
      {activeView === "resolution" && (
        <ResolutionSettingsModal onClose={() => setActiveView(null)} />
      )}
      {activeView === "general" && (
        <GeneralSettingsModal onClose={() => setActiveView(null)} />
      )}
    </>
  );
}
