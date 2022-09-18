import { Professor } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";

const Home: NextPage = () => {
  const [professorQuery, setProfessorQuery] = useState("");
  //const [results, setResults] = useState<Professor[]>([]);

  const { data, error } = useSWRImmutable<HttpResponse<Professor>>(
    professorQuery && professorQuery.length > 2
      ? `/api/professor?search=${professorQuery}`
      : null,
    getFetcher
  );

  return (
    <div className="bg-gradient-to-tr from-red-200 via-slate-50 to-green-200">
      <div className="p-10 text-3xl md:text-5xl lg:text-7xl text-center">
        Make an informed desicion <br /> on next semester&apos;s classes
      </div>
      <div className="p-10 flex justify-center w-full">
        <input
          className="input-primary md:w-1/2 w-full"
          type="text"
          placeholder="Search for a professor"
          value={professorQuery}
          onChange={(e) => setProfessorQuery(e.target.value)}
        ></input>
      </div>
      <div>
        {((data?.data || []) as Professor[]).map((professor) => (
          <div key={professor.id}>
            {professor.firstName} {professor.lastName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
