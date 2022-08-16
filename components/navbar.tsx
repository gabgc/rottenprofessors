const Navbar = () => {
  return (
    <nav className="w-full flex justify-center space-x-4">
      <div></div>
      <div>
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
