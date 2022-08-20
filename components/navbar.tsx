const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full flex">
      <div className="basis-1/4 flex justify-center items-center">
        <h1>ROTTEN PROFESSORS</h1>
      </div>
      <div className="basis-3/4 w-full flex justify-end">
        <a
          href="/dashboard"
          className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Home
        </a>
        <a
          href="/team"
          className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Team
        </a>
        <a
          href="/projects"
          className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Projects
        </a>
        <a
          href="/reports"
          className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
        >
          Reports
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
