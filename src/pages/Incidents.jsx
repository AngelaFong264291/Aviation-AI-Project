import { useMemo, useState } from "react";
import incidents from "../data/incidents.json";
import IncidentCard from "../components/IncidentCard";

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [causeFilter, setCauseFilter] = useState("All");
  const [aircraftFilter, setAircraftFilter] = useState("All");

  const uniqueCauses = [...new Set(incidents.map((incident) => incident.cause))];
  const uniqueAircraft = [...new Set(incidents.map((incident) => incident.aircraftType))];

  const filteredIncidents = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return incidents.filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(term) ||
        incident.aircraftType.toLowerCase().includes(term) ||
        incident.location.toLowerCase().includes(term) ||
        incident.cause.toLowerCase().includes(term) ||
        incident.description.toLowerCase().includes(term);

      const matchesSeverity =
        severityFilter === "All" || incident.severity === severityFilter;

      const matchesCause =
        causeFilter === "All" || incident.cause === causeFilter;

      const matchesAircraft =
        aircraftFilter === "All" || incident.aircraftType === aircraftFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesCause &&
        matchesAircraft
      );
    });
  }, [searchTerm, severityFilter, causeFilter, aircraftFilter]);

  return (
    <section className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Incident Database</h1>
        <p className="mt-2 text-slate-600">
          Search and review aircraft occurrence records across multiple fields.
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          placeholder="Search title, aircraft, location, cause..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        />

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        >
          <option value="All">All Severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={causeFilter}
          onChange={(e) => setCauseFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        >
          <option value="All">All Causes</option>
          {uniqueCauses.map((cause) => (
            <option key={cause} value={cause}>
              {cause}
            </option>
          ))}
        </select>

        <select
          value={aircraftFilter}
          onChange={(e) => setAircraftFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        >
          <option value="All">All Aircraft</option>
          {uniqueAircraft.map((aircraft) => (
            <option key={aircraft} value={aircraft}>
              {aircraft}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        Showing {filteredIncidents.length} incident
        {filteredIncidents.length !== 1 ? "s" : ""}
      </p>

      {filteredIncidents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No incidents match your search or filters.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </section>
  );
}