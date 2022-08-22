import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full flex">
      <div className="basis-1/4 flex justify-center items-center">
        <h1>ROTTEN PROFESSORS</h1>
      </div>
      <div className="basis-3/4 w-full flex justify-end">
        <Link href={"/"}>
          <a className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Home
          </a>
        </Link>
        <Link href={"/university"}>
          <a className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Universities
          </a>
        </Link>
        <Link href={"/professor"}>
          <a className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            Professors
          </a>
        </Link>
        <Link href={"/about"}>
          <a className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
            About
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
