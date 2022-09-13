import { University } from "@prisma/client";
import { useMemo } from "react";
import useSWR from "swr";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";
import AddProfessorForm from "./addProfessorForm";
import AddUniversityForm from "./addUniversityForm";
import Table from "./table";

const AdminPanel = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Universities",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Address",
            accessor: "address",
          },
          {
            Header: "City",
            accessor: "city",
          },
        ],
      },
    ],
    []
  );

  const { data, error } = useSWR<HttpResponse<University>>(
    "/api/university",
    getFetcher
  );

  let table;
  if (data && !error) {
    table = <Table columns={columns} data={data.data as University[]} />;
  } else {
    table = <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full">{table}</div>
      <div className="flex p-4">
        <div className="w-1/2 p-6">
          <AddProfessorForm></AddProfessorForm>
        </div>

        <div className="w-1/2 p-6">
          <AddUniversityForm></AddUniversityForm>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
