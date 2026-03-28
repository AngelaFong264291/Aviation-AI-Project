import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import incidents from "../data/incidents.json";
import IncidentCard from "../components/IncidentCard";
import { getAIInsight } from "../services/gemini";

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = incidents.find((item) => item.id === id);
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const related = incident
    ? incidents
        .filter(
          (item) =>
            item.id !== incident.id &&
            (item.cause === incident.cause || item.aircraftType === incident.aircraftType)
        )
        .slice(0, 3)
    : [];

  async function handleAI() {
    setLoading(true);
    try {
      const result = await getAIInsight(
        incident,
        "Provide a concise overall insight for this incident with summary, possible causes, and recommendations.",
        "insight"
      );
      setAIResponse(result);
    } catch (error) {
      setAIResponse(error.message || "Unable to generate AI insight right now.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI() {
    if (!question.trim()) {
      setAIResponse("Please enter a question before asking AI.");
      return;
    }

    setLoading(true);
    try {
      const result = await getAIInsight(incident, question, "question");
      setAIResponse(result);
    } catch (error) {
      setAIResponse(error.message || "Unable to answer that question right now.");
    } finally {
      setLoading(false);
    }
  }

  const aiSections = parseAISections(aiResponse);
  const isStructuredResponse =
    Boolean(aiSections.possibleCauses) || Boolean(aiSections.recommendations);

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

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  AI Assistant
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Incident Insight
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Generate a quick overview or ask a focused follow-up question about this
                  incident.
                </p>
              </div>

              <button
                onClick={handleAI}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Generating..." : "Generate Quick Insight"}
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <label
                htmlFor="incident-ai-question"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Ask A Specific Question
              </label>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                <input
                  id="incident-ai-question"
                  type="text"
                  placeholder="Ask about causes, risk, actions, or next steps..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  onClick={handleAskAI}
                  disabled={loading || !question.trim()}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Ask AI
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Try: "What is the likely root cause?" or "What should the team do next?"
              </p>
            </div>
          </div>

          {loading && (
            <p className="px-6 pb-2 text-sm text-slate-500">Loading AI response...</p>
          )}

          {aiResponse && (
            <div className="mx-6 mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-slate-900">AI Insight</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Generated from incident details
                </span>
              </div>
              {isStructuredResponse ? (
                <div className="grid gap-4">
                  <AISection
                    title="Summary"
                    content={aiSections.summary}
                    tone="highlight"
                  />
                  <div className="grid gap-4 lg:grid-cols-2">
                    <AISection
                      title="Possible Causes"
                      content={aiSections.possibleCauses}
                    />
                    <AISection
                      title="Recommendations"
                      content={aiSections.recommendations}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Answer
                  </h4>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                    {aiResponse}
                  </p>
                </div>
              )}
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Similar Incidents</h3>
              <div className="mt-4 grid gap-4">
                {related.map((item) => (
                  <IncidentCard key={item.id} incident={item} />
                ))}
              </div>
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

function AISection({ title, content, tone = "default" }) {
  if (!content) {
    return null;
  }

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const isHighlight = tone === "highlight";

  return (
    <div
      className={
        isHighlight
          ? "rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-5"
          : "rounded-2xl border border-slate-200 bg-slate-50 p-5"
      }
    >
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </h4>
      {isHighlight ? (
        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-700">{content}</p>
      ) : (
        <div className="mt-3 space-y-3">
          {lines.map((line, index) => (
            <div key={`${title}-${index}`} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
              <p className="flex-1 text-sm leading-7 text-slate-700">{line}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function parseAISections(text) {
  if (!text) {
    return {
      summary: "",
      possibleCauses: "",
      recommendations: "",
    };
  }

  const summaryMatch = text.match(
    /Summary:\s*([\s\S]*?)(?:Possible Causes:|Recommendations:|$)/
  );
  const causesMatch = text.match(
    /Possible Causes:\s*([\s\S]*?)(?:Recommendations:|$)/
  );
  const recommendationsMatch = text.match(/Recommendations:\s*([\s\S]*?)$/);

  return {
    summary:
      summaryMatch?.[1]?.trim() ||
      (!causesMatch && !recommendationsMatch ? text.trim() : ""),
    possibleCauses: causesMatch?.[1]?.trim() || "",
    recommendations: recommendationsMatch?.[1]?.trim() || "",
  };
}
