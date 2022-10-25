import Link from "next/link";
import Image from "next/image";
import icon from "../public/icon.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQueryMatches, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../hooks/useMediaQueryMatches";
import ProfessorSearch from "./professorSearch";
import { useState } from "react";

const Navbar = () => {
  const matches = useMediaQueryMatches(MEDIA_QUERY_BREAKPOINTS.lg);
  const [isOpen, setIsOpen] = useState(false);

  let links;
  if (matches) {
    links = (
      <div className="ml-auto flex justify-end">
        <div className="grid grid-cols-3 items-center ">
          <div>
            <a
              href={"/university"}
              className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200"
            >
              Universities
            </a>
          </div>
          <div>
            <a
              href={"/professor"}
              className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200"
            >
              Professors
            </a>
          </div>
          <div>
            <a
              href={"/login"}
              className="font-bold m-2 px-3 py-2 bg-green-300 rounded-lg hover:bg-green-500 hover:text-white duration-200"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    links = (
      <div className="flex justify-end items-center mr-4">
        <Bars3Icon
          onClick={() => setIsOpen(true)}
          className="h-8 w-8 "
        ></Bars3Icon>
      </div>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full grid grid-cols-2 lg:grid-cols-3 shadow-lg bg-white">
        <div className="m-3 flex items-center">
          <a href={"/"}>
            <div className="flex items-center">
              <div className="w-12 h-12">
                <Image src={icon} alt="Rotten Professors"></Image>
              </div>
              <h1 className="text-lg font-bold whitespace-nowrap">
                Rotten Professors
              </h1>
            </div>
          </a>
        </div>
        {matches && (
          <div className="flex items-center m-3">
            <ProfessorSearch></ProfessorSearch>
          </div>
        )}
        {links}
      </nav>
      {!matches && isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="relative left-1/4 sm:left-1/2 w-3/4 sm:w-1/2 h-full bg-white ">
            <div className="flex justify-end items-center">
              <button
                className="hover:bg-slate-500 hover:outline-1 rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon height="2em" width="2em"></XMarkIcon>
              </button>
            </div>
            <div className="py-6">
              <div className="p-3">
                <a
                  href={"/university"}
                  className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200"
                >
                  Universities
                </a>
              </div>
              <div className="p-3">
                <a
                  href={"/professor"}
                  className="font-bold m-2 px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 duration-200"
                >
                  Professors
                </a>
              </div>
              <div className="p-3">
                <a
                  href={"/login"}
                  className="font-bold m-2 px-3 py-2 bg-green-300 rounded-lg hover:bg-green-500 hover:text-white duration-200"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
