import { University } from "@prisma/client";
import { useState } from "react";

const AddUniversityForm = () => {
  const [university, setUniversity] = useState({
    name: "",
    address: "",
    city: "",
  } as University);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const req = await fetch("api/university", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(university),
    });
    const res = await req.json();
    setLoading(false);
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
        Add University
      </h1>
      <form className="flex flex-col">
        <div className="p-6">
          <label>Name</label>
          <input
            className="input-primary"
            type="text"
            value={university.name}
            onChange={(e) =>
              setUniversity({ ...university, name: e.target.value })
            }
          />
        </div>

        <div className="p-6">
          <label>Address</label>
          <input
            className="input-primary"
            type="text"
            value={university.address}
            onChange={(e) =>
              setUniversity({ ...university, address: e.target.value })
            }
          />
        </div>

        <div className="p-6">
          <label>City</label>
          <input
            className="input-primary"
            type="text"
            value={university.city}
            onChange={(e) =>
              setUniversity({
                ...university,
                city: e.target.value,
              })
            }
          />
        </div>
        {button}
      </form>
    </div>
  );
};

export default AddUniversityForm;
