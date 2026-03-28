import { NavLink } from "react-router-dom";

const linkBase =
  "rounded-lg px-4 py-2 text-sm font-medium transition";
const activeClass = "bg-slate-900 text-white";
const inactiveClass = "text-slate-600 hover:bg-slate-200";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold">Aviation Intelligence Hub</h1>
          <p className="text-sm text-slate-500">
            Aircraft occurrence and procedure insights
          </p>
        </div>

        <nav className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/incidents"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Incidents
          </NavLink>

          <NavLink
            to="/procedures"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Procedures
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

