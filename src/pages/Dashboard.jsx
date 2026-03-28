import incidents from "../data/incidents.json";
import IncidentCard from "../components/IncidentCard";

export default function Dashboard() {
  const totalIncidents = incidents.length;
  const highRiskCount = incidents.filter((item) => item.severity === "High").length;
  const openCount = incidents.filter((item) => item.status === "Open").length;

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Overview
        </p>
        <h2 className="mt-1 text-3xl font-bold">Operational Intelligence Dashboard</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Monitor incident trends, review severity, and access occurrence data in a
          centralized aviation intelligence workspace.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Total Incidents</p>
          <h3 className="mt-2 text-3xl font-bold">{totalIncidents}</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">High Severity</p>
          <h3 className="mt-2 text-3xl font-bold">{highRiskCount}</h3>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Open Cases</p>
          <h3 className="mt-2 text-3xl font-bold">{openCount}</h3>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold">Recent Incidents</h3>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {incidents.slice(0, 3).map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </section>
  );
}

