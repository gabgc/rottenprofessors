import { Course, Department } from "@prisma/client";
import { useState } from "react";
import { getFetcher } from "../util/fetcher";
import { HttpResponse } from "../util/http.response.model";
import useSWRImmutable from "swr/immutable";
import { Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";

const AddCourseForm = (props: {
  setCourse: (course: Course) => void;
  close: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      departmentId: -1,
    },
    onSubmit: async (values) => {
      const course = {
        name: values.name,
        code: values.code,
        departmentId: +values.departmentId,
      };
      setLoading(true);
      const response = await fetch("/api/university/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const data: HttpResponse<Course> = await response.json();
      setLoading(false);
      if (data.data && !Array.isArray(data.data)) {
        props.setCourse(data.data);
        props.close();
      }
    },
  });

  const fetchDepartments = useSWRImmutable<HttpResponse<Department>>(
    "/api/university/department",
    getFetcher
  );

  return (
    <form onSubmit={formik.handleSubmit} className="p-3">
      <div className="m-3">
        <label htmlFor="name" className="text-md">
          Course name
        </label>
        <TextInput
          id="name"
          name="name"
          placeholder="e.g. Introduction to Computer Science"
          onChange={formik.handleChange}
          value={formik.values.name}
        ></TextInput>
      </div>
      <div className="m-3">
        <label htmlFor="code" className="text-md">
          Course code
        </label>
        <TextInput
          id="code"
          name="code"
          placeholder="e.g. COMP 1000"
          onChange={formik.handleChange}
          value={formik.values.code}
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
            Add course
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCourseForm;
