import { useState } from "react";
import { Professor } from "@prisma/client";
import useSWRImmutable from "swr/immutable";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";
import Link from "next/link";

const ProfessorSearch = () => {
  const [professorQuery, setProfessorQuery] = useState("");

  const { data, error } = useSWRImmutable<HttpResponse<Professor>>(
    professorQuery && professorQuery.length > 1
      ? `/api/professor?search=${professorQuery}`
      : null,
    getFetcher
  );

  const formatResult = (fullName: string) => {
    const lowerCaseFullName = fullName.toLowerCase();
    const lowerCaseQuery = professorQuery.toLowerCase();
    const index = lowerCaseFullName.indexOf(lowerCaseQuery);
    if (index === 0) {
      return (
        <span>
          <b>{fullName.substring(0, professorQuery.length)}</b>
          {fullName.substring(professorQuery.length, fullName.length)}
        </span>
      );
    } else if (index !== -1) {
      const beginning = fullName.substring(0, index);
      const middle = fullName.substring(index, index + professorQuery.length);
      const end = fullName.substring(
        index + professorQuery.length,
        fullName.length
      );
      return (
        <span>
          {beginning}
          <b>{middle}</b>
          {end}
        </span>
      );
    }
    return <span>{fullName}</span>; // this shouldn't happen but just in case
  };

  const renderResults = () => {
    // render loading
    if (professorQuery.length > 2 && !data && !error) {
      return (
        <ul className="bg-white border border-gray-100 w-full absolute">
          Loading...
        </ul>
      );
    }
    // render results
    if (data && Array.isArray(data.data)) {
      if (data.data.length === 0) {
        return (
          <ul className="bg-white border border-gray-100 w-full absolute">
            <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer text-gray-600">
              No results.
            </li>
          </ul>
        );
      }
      return (
        <ul className="bg-white border border-gray-100 w-full absolute">
          {data.data.map((professor) => (
            <li
              className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-green-50 hover:text-gray-900"
              key={professor.id}
            >
              <Link href={`/professor/${professor.id}`}>
                <a>
                  <span>
                    {formatResult(
                      `${professor.firstName} ${professor.lastName}`
                    )}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-center relative">
        <input
          className="input-primary"
          type="text"
          placeholder="Search for a professor"
          value={professorQuery}
          onChange={(e) => setProfessorQuery(e.target.value)}
        ></input>
      </div>
      {renderResults()}
    </div>
  );
};

export default ProfessorSearch;
