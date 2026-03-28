import { useMemo, useState } from "react";
import incidents from "../data/incidents.json";
import IncidentCard from "../components/IncidentCard";
import SearchFilterBar from "../components/SearchFilterBar";

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.aircraftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity =
        severityFilter === "All" || incident.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, severityFilter]);

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Incident Database
        </p>
        <h2 className="mt-1 text-3xl font-bold text-slate-900">
          Aircraft Occurrence Records
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Search and review aircraft maintenance and operational incidents in one
          centralized view.
        </p>
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
      />

      <p className="mb-4 text-sm text-slate-500">
        Showing {filteredIncidents.length} incident
        {filteredIncidents.length !== 1 ? "s" : ""}
      </p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </section>
  );
}

