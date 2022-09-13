import { Department, Professor, University } from "@prisma/client";
import { Select } from "flowbite-react";
import { useState } from "react";
import useSWR from "swr";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";

const AddProfessorForm = () => {
  const [professor, setProfessor] = useState({
    firstName: "",
    lastName: "",
    overallRating: 0,
    universityId: -1,
    departmentId: null,
  } as Professor);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (professor.departmentId === 0) {
      setProfessor({ ...professor, departmentId: null });
    }
    const req = await fetch("api/professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(professor),
    });
    const res = await req.json();
    setLoading(false);
    // TODO - do somethin with res
  };

  // dropdown options
  const fetchUniversities = useSWR<HttpResponse<University>>(
    "/api/university",
    getFetcher
  );

  const fetchDepartments = useSWR<HttpResponse<Department>>(
    "/api/university/department",
    getFetcher
  );

  let button;
  if (!loading) {
    button = (
      <button
        className="p-4 m-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleSubmit}
      >
        Submit
      </button>
    );
  } else {
    button = (
      <button
        className="disabled p-4 m-6 bg-blue-500 text-slate-400 font-semibold rounded-lg shadow-md"
        onClick={handleSubmit}
      >
        Submitting...
      </button>
    );
  }

  let form =
    !fetchUniversities.data || !fetchDepartments.data ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1 className="w-full text-center font-bold text-lg mt-3">
          Add Professor
        </h1>
        <form className="flex flex-col">
          <div className="p-6">
            <label>First Name</label>
            <input
              className="input-primary"
              type="text"
              value={professor.firstName}
              onChange={(e) =>
                setProfessor({ ...professor, firstName: e.target.value })
              }
            />
          </div>
          <div className="p-6">
            <label>Last Name</label>
            <input
              className="input-primary"
              type="text"
              value={professor.lastName}
              onChange={(e) =>
                setProfessor({ ...professor, lastName: e.target.value })
              }
            />
          </div>
          <div id="select" className="p-6 block">
            <label>University</label>
            <Select
              defaultValue={"0"}
              onChange={(e) =>
                setProfessor({
                  ...professor,
                  universityId: parseInt(e.target.value),
                })
              }
            >
              <option value="0">Choose a university...</option>
              {(fetchUniversities.data?.data as University[]).map(
                (university) => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                )
              )}
            </Select>
          </div>
          <div className="p-6">
            <label>Department</label>
            <Select
              defaultValue={"0"}
              onChange={(e) =>
                setProfessor({
                  ...professor,
                  departmentId: parseInt(e.target.value),
                })
              }
            >
              <option value="0">Choose a department...</option>
              {(fetchDepartments.data?.data as Department[]).map(
                (department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                )
              )}
            </Select>
          </div>
          {button}
        </form>
      </div>
    );

  return (
    <div className="flex flex-col shadow-lg rounded-lg bg-slate-300">
      {form}
    </div>
  );
};

export default AddProfessorForm;
