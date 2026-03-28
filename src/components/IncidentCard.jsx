import { Link } from "react-router-dom";

export default function IncidentCard({ incident }) {
  return (
    <Link
      to={`/incidents/${incident.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {incident.id}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {incident.title}
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {incident.severity}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Aircraft:</span>{" "}
          {incident.aircraftType}
        </p>
        <p>
          <span className="font-medium text-slate-800">Location:</span>{" "}
          {incident.location}
        </p>
        <p>
          <span className="font-medium text-slate-800">Cause:</span>{" "}
          {incident.cause}
        </p>
        <p>
          <span className="font-medium text-slate-800">Status:</span>{" "}
          {incident.status}
        </p>
      </div>

      <p className="mt-4 text-sm text-slate-500">{incident.date}</p>
    </Link>
  );
}
