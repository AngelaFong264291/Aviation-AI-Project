import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import incidents from "../data/incidents.json";
import { getAIInsight } from "../services/gemini";

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = incidents.find((item) => item.id === id);
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAI() {
    setLoading(true);
    const result = await getAIInsight(incident);
    setAIResponse(result);
    setLoading(false);
  }

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

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                AI Assistant
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Generate Incident Insight
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Get a quick AI-generated summary and recommended next actions for this incident.
              </p>
            </div>

            <button
              onClick={handleAI}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Generating..." : "Generate AI Insight"}
            </button>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-slate-500">Loading AI response...</p>
          )}

          {aiResponse && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">AI Insight</h3>
              <p className="whitespace-pre-line leading-7 text-slate-700">{aiResponse}</p>
            </div>
          )}
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
