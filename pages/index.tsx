import type { NextPage } from "next";
import ProfessorCardWrapper from "../components/ProfessorCardWrapper";
import ProfessorSearch from "../components/professorSearch";

const Home: NextPage = () => {
  return (
    <div>
      <div className="w-full flex align-middle justify-center">
        <div className="w-full px-12 py-8">
          <ProfessorSearch />
        </div>
      </div>
      <div className="w-full min-h-[280px] flex align-middle justify-center">
        <div className="w-full py-8 min-h-full">
          <div className="pl-12">
            <span className="text-gray-25 font-bold">Most Searched</span>
            <span className="text-gray-25"> Professors</span>
          </div>

          <ProfessorCardWrapper />
        </div>
      </div>
    </div>
  );
};

export default Home;
