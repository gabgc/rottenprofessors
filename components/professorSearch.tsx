import { useRef, useState } from "react";
import { Professor } from "@prisma/client";
import useSWRImmutable from "swr/immutable";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";
import useOutsideClick from "../hooks/useOutsideClick";

const ProfessorSearch = () => {
  const [professorQuery, setProfessorQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useOutsideClick(dropdownRef, searchRef, setProfessorQuery);

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
    if (professorQuery.length > 1 && !data && !error) {
      return (
        <ul className=" bg-white border border-gray-100 w-full absolute rounded-b-x rounded-b-xl">
          <li className=" p-2 relative cursor-pointer text-gray-600">
            Loading...
          </li>
        </ul>
      );
    }
    // render results
    if (data && Array.isArray(data.data)) {
      if (data.data.length === 0) {
        return (
          <ul className="bg-white border border-gray-100 w-full absolute rounded-b-xl">
            <li className="p-2 relative text-gray-600">No results.</li>
          </ul>
        );
      }
      return (
        <ul className="bg-white border border-gray-100 w-full absolute rounded-b-xl">
          {data.data.map((professor) => (
            <li
              className="last:rounded-b-xl last:border-none border-b-2 border-gray-100 hover:bg-green-50 hover:text-gray-900 relative "
              key={professor.id}
            >
              <a
                href={`/professor/${professor.id}`}
                className="professor-search-result w-full h-full "
                onClick={() => setProfessorQuery("")}
              >
                <div className="p-2">
                  {formatResult(`${professor.firstName} ${professor.lastName}`)}
                </div>
              </a>
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
          ref={searchRef}
          className={`input-primary rounded-xl ${
            professorQuery.length > 1 ? " rounded-b-none" : null
          }`}
          type="text"
          placeholder="Search for a professor"
          value={professorQuery}
          onChange={(e) => setProfessorQuery(e.target.value)}
        ></input>
      </div>
      <div ref={dropdownRef}>{renderResults()}</div>
    </div>
  );
};

export default ProfessorSearch;
