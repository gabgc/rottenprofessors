import { Professor } from "@prisma/client";
import { useState } from "react";

const AddProfessorForm = () => {
  const [professor, setProfessor] = useState({
    firstName: "",
    lastName: "",
    overallRating: 0,
    universityId: 0,
    departmentId: null,
  } as Professor);

  const [loading, setLoading] = useState(false);

  const preprocessProfessor = () => {
    if (professor.departmentId === 0) {
      setProfessor({ ...professor, departmentId: null });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    preprocessProfessor();
    const req = await fetch("api/professor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(professor),
    });
    const res = await req.json();

    // TODO - do somethin with res
  };

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

  return (
    <div className="flex flex-col shadow-lg rounded-lg bg-slate-300">
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
        <div className="p-6">
          <label>University ID</label>
          <input
            className="input-primary"
            type="text"
            value={professor.universityId}
            onChange={(e) =>
              setProfessor({
                ...professor,
                universityId: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="p-6">
          <label>Department ID (Optional)</label>
          <input
            className="input-primary"
            type="text"
            value={professor.departmentId || 0}
            onChange={(e) =>
              setProfessor({
                ...professor,
                departmentId: parseInt(e.target.value),
              })
            }
          />
        </div>
        {button}
      </form>
    </div>
  );
};

export default AddProfessorForm;
