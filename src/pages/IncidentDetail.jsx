import { useParams, Link } from "react-router-dom";
import incidents from "../data/incidents.json";

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">Incident not found</h2>
        <Link to="/incidents" className="mt-4 inline-block text-slate-700 underline">
          Back to incidents
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <Link to="/incidents" className="mb-6 inline-block text-sm text-slate-600 underline">
        ← Back to incidents
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              {incident.id}
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {incident.title}
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {incident.severity} Severity
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoItem label="Date" value={incident.date} />
          <InfoItem label="Aircraft Type" value={incident.aircraftType} />
          <InfoItem label="Location" value={incident.location} />
          <InfoItem label="Cause Category" value={incident.cause} />
          <InfoItem label="Status" value={incident.status} />
          <InfoItem label="Linked Procedure" value={incident.procedureId} />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-900">Description</h3>
          <p className="mt-2 leading-7 text-slate-600">{incident.description}</p>
        </div>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-900">AI Insight Area</h3>
          <p className="mt-2 text-slate-600">
            Phase 2 will add Gemini summary and recommendations here.
          </p>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}
