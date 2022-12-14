import { Department, Professor, University } from "@prisma/client";
import { useState } from "react";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";
import useSWRImmutable from "swr/immutable";
import { Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";

export type AddProfessorModel = {
  firstName: string;
  lastName: string;
  universityId: number;
  picture: string | null;
  departmentId: number;
};

const AddProfessorForm = (props: {
  setProfessor?: (professor: Professor) => void;
  close?: () => void;
  onSuccess?: (professor: Professor) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<AddProfessorModel>({
    initialValues: {
      firstName: "",
      lastName: "",
      universityId: -1,
      picture: null,
      departmentId: -1,
    },
    onSubmit: async (values) => {
      setLoading(true);
      const response = await fetch("/api/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data: HttpResponse<Professor> = await response.json();
      setLoading(false);
      if (data.data && !Array.isArray(data.data)) {
        if (props.setProfessor !== undefined) props.setProfessor(data.data);
        if (props.close !== undefined) props.close();
        if (props.onSuccess) props.onSuccess(data.data);
      }
    },
  });

  const fetchDepartments = useSWRImmutable<HttpResponse<Department>>(
    "/api/university/department",
    getFetcher
  );

  const fetchUniversities = useSWRImmutable<HttpResponse<University>>(
    "/api/university",
    getFetcher
  );

  return (
    <form onSubmit={formik.handleSubmit} className="p-3">
      <div className="m-3">
        <label htmlFor="firstName" className="text-md">
          First Name
        </label>
        <TextInput
          id="firstName"
          name="firstName"
          placeholder="Enter first name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        ></TextInput>
      </div>
      <div className="m-3">
        <label htmlFor="lastName" className="text-md">
          Last Name
        </label>
        <TextInput
          id="lastName"
          name="lastName"
          placeholder="Enter last name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        ></TextInput>
      </div>
      <div className="m-3">
        <label className="text-md">Department</label>
        {!fetchDepartments.data ? (
          <div>Loading...</div>
        ) : (
          <Select
            id="departmentId"
            name="departmentId"
            defaultValue={"0"}
            onChange={formik.handleChange}
          >
            <option value="0">Choose a department...</option>
            {(fetchDepartments.data?.data as Department[]).map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>
        )}
      </div>
      <div className="m-3">
        <label className="text-md">University</label>
        {!fetchUniversities.data ? (
          <div>Loading...</div>
        ) : (
          <Select
            id="universityId"
            name="universityId"
            defaultValue={"0"}
            onChange={formik.handleChange}
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
        )}
      </div>
      <div className="m-3 flex items-center justify-center">
        {loading ? (
          <button className="disabled p-4 m-6 bg-slate-500 text-slate-100 font-semibold rounded-lg shadow-md cursor-not-allowed">
            Adding...
          </button>
        ) : (
          <button
            type="submit"
            className="p-4 m-6  bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 duration-300"
          >
            Add professor
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProfessorForm;
