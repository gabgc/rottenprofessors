import type { NextPage } from "next";
import ProfessorSearch from "../components/professorSearch";
import useMediaQueryMatches, {
  MEDIA_QUERY_BREAKPOINTS,
} from "../hooks/useMediaQueryMatches";

const Home: NextPage = () => {
  const matches = useMediaQueryMatches(MEDIA_QUERY_BREAKPOINTS.md);

  const headerText = matches ? (
    <span>
      Make an informed desicion on <br /> next semester&apos;s classes
    </span>
  ) : (
    <span>Make an informed desicion on next semester&apos;s classes</span>
  );

  return (
    <div className="bg-gradient-to-tr from-red-200 via-slate-50 to-green-200">
      <div className="p-10 text-3xl md:text-5xl lg:text-7xl text-center">
        {headerText}
      </div>
      <div className="w-full flex justify-center p-10">
        <div className="md:w-1/2 w-full">
          <ProfessorSearch />
        </div>
      </div>
    </div>
  );
};

export default Home;
