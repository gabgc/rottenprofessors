import Link from "next/link";
import Image from "next/image";
import icon from "../public/icon.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import useMediaQueryMatches, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../hooks/useMediaQueryMatches";
import ProfessorSearch from "./professorSearch";

const Navbar = () => {
  const matches = useMediaQueryMatches(MEDIA_QUERY_BREAKPOINTS.md);

  let links;
  if (matches) {
    links = (
      <div className="flex justify-end mr-4 w-1/3">
        <div className="flex justify-between">
          <Link href={"/university"}>
            <a className="font-bold flex items-center m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
              Universities
            </a>
          </Link>
          <Link href={"/professor"}>
            <a className="font-bold flex items-center m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200">
              Professors
            </a>
          </Link>
          <Link href={"/login"}>
            <a className="font-bold flex items-center m-2 px-3 py-2 bg-green-300 rounded-lg hover:bg-green-500 hover:text-white duration-200 whitespace-nowrap">
              Login
            </a>
          </Link>
        </div>
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
    <nav className="sticky top-0 z-50 w-full flex justify-between shadow-lg">
      <div className="w-1/3 flex flex-shrink-0 items-center m-3">
        <Link href={"/"}>
          <a>
            <div className="flex items-center">
              <div className="w-12 h-12">
                <Image src={icon} alt="Rotten Professors"></Image>
              </div>
              <h1 className="text-lg font-bold whitespace-nowrap">
                Rotten Professors
              </h1>
            </div>
          </a>
        </Link>
      </div>
      {matches && (
        <div className="flex items-center w-1/4 lg:w-1/3">
          <ProfessorSearch></ProfessorSearch>
        </div>
      )}
      {links}
    </nav>
  );
};

export default Navbar;
