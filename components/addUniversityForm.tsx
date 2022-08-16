import { University } from "@prisma/client";
import { useState } from "react";

const AddUniversityForm = () => {
  const [university, setUniversity] = useState({
    name: "",
    address: "",
    city: "",
  } as University);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const req = await fetch("api/university", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(university),
    });
    const res = await req.json();
    // TODO - do somethin with res
  };

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center">Add University</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={university.name}
          onChange={(e) =>
            setUniversity({ ...university, name: e.target.value })
          }
        />
        <label>Address</label>
        <input
          type="text"
          value={university.address}
          onChange={(e) =>
            setUniversity({ ...university, address: e.target.value })
          }
        />
        <label>City</label>
        <input
          type="text"
          value={university.city}
          onChange={(e) =>
            setUniversity({
              ...university,
              city: e.target.value,
            })
          }
        />
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddUniversityForm;
