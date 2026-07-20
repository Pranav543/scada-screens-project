import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { scadas } from "../mockData/scadas";
import { SettingsMenu } from "../components/SettingsMenu";

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const allowedScadas = useMemo(
    () =>
      scadas.filter((scada) => user?.allowedScadas.includes(scada.id) ?? false),
    [user],
  );

  const [selectedId, setSelectedId] = useState<number>(
    () => allowedScadas[0]?.id ?? 0,
  );

  useEffect(() => {
    if (
      allowedScadas.length > 0 &&
      !allowedScadas.some((scada) => scada.id === selectedId)
    ) {
      setSelectedId(allowedScadas[0].id);
    }
  }, [allowedScadas, selectedId]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const selectedScada =
    allowedScadas.find((scada) => scada.id === selectedId) ?? allowedScadas[0];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <img
            src="/LOGO.jpg"
            alt="Orchid Pharma"
            className="h-10 object-contain"
          />
          <SettingsMenu onLogout={handleLogout} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-800">
            Live Screen Monitoring
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome, {user.name} ({user.role})
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="scada-select"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Select SCADA Screen
          </label>
          <select
            id="scada-select"
            value={selectedScada?.id ?? ""}
            onChange={(event) => setSelectedId(Number(event.target.value))}
            className="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            {allowedScadas.map((scada) => (
              <option key={scada.id} value={scada.id}>
                {scada.name}
              </option>
            ))}
          </select>
        </div>

        {selectedScada && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                {selectedScada.name}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
              <img
                src={selectedScada.image}
                alt={selectedScada.name}
                className="aspect-video w-full object-contain"
              />
            </div>

            <p className="mt-3 text-center text-xs text-slate-400">
              Displaying: {selectedScada.name}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
