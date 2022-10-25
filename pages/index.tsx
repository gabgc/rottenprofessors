import type { NextPage } from "next";
import ProfessorSearch from "../components/professorSearch";
import useMediaQueryMatches, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../hooks/useMediaQueryMatches";

const Home: NextPage = () => {
  const matches = useMediaQueryMatches(MEDIA_QUERY_BREAKPOINTS.md);

  const headerText = matches ? (
    <span>
      Make an informed desicion
      <br /> on next semester&apos;s classes
    </span>
  ) : (
    <span>Make an informed desicion on next semester&apos;s classes</span>
  );

  return (
    <div className="bg-gradient-to-tr from-slate-600 to-green-500">
      <div className="p-11 lg:p-24 text-4xl md:text-5xl lg:text-7xl text-center text-white">
        {headerText}
      </div>
      {!matches && (
        <div className="w-full flex justify-center p-10">
          <ProfessorSearch />
        </div>
      )}
    </div>
  );
};

export default Home;
