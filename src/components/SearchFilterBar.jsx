export default function SearchFilterBar({
    searchTerm,
    setSearchTerm,
    severityFilter,
    setSeverityFilter,
  }) {
    return (
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <input
          type="text"
          placeholder="Search by title, aircraft type, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
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
      </div>
    );
  }
  