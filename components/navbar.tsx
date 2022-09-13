import Link from "next/link";
import Image from "next/image";
import icon from "../public/icon.png";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setMatches(window.matchMedia("(min-width: 768px)").matches);
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  let links;
  if (matches) {
    links = (
      <div className="basis-3/4 flex justify-end mr-4">
        <Link href={"/"}>
          <a className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
            Home
          </a>
        </Link>
        <Link href={"/university"}>
          <a className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
            Universities
          </a>
        </Link>
        <Link href={"/professor"}>
          <a className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
            Professors
          </a>
        </Link>
        <Link href={"/about"}>
          <a className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
            About
          </a>
        </Link>
      </div>
    );
  } else {
    links = (
      <div className="basis-1/2 flex justify-end items-center mr-4">
        <Bars3Icon className="h-8 w-8 "></Bars3Icon>
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full flex shadow-lg">
      <div className="basis-1/2 lg:basis-1/4 flex justify-start items-center">
        <div className="w-12 h-12">
          <Image src={icon} alt="Rotten Professors"></Image>
        </div>
        <h1 className="text-lg font-bold">Rotten Professors</h1>
      </div>
      {links}
    </nav>
  );
};

export default Navbar;
