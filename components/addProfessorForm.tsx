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

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center">Add Professor</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={professor.firstName}
          onChange={(e) =>
            setProfessor({ ...professor, firstName: e.target.value })
          }
        />
        <label>Last Name</label>
        <input
          type="text"
          value={professor.lastName}
          onChange={(e) =>
            setProfessor({ ...professor, lastName: e.target.value })
          }
        />
        <label>University ID</label>
        <input
          type="text"
          value={professor.universityId}
          onChange={(e) =>
            setProfessor({
              ...professor,
              universityId: parseInt(e.target.value),
            })
          }
        />
        <label>Department ID (Optional)</label>
        <input
          type="text"
          value={professor.departmentId || 0}
          onChange={(e) =>
            setProfessor({
              ...professor,
              departmentId: parseInt(e.target.value),
            })
          }
        />
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddProfessorForm;
