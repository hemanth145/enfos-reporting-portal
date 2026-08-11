import { Link } from "react-router-dom";

/** App header with the Enfos wordmark; links back to the landing page. */
export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            E
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-800">
            Enfos <span className="font-normal text-slate-400">Reporting</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
