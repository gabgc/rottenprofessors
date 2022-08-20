import type { NextPage } from "next";
import AddProfessorForm from "../components/addProfessorForm";
import AddUniversityForm from "../components/addUniversityForm";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AdminPanel></AdminPanel>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <div className="flex p-4">
      <div className="w-1/2 p-6">
        <AddProfessorForm></AddProfessorForm>
      </div>

      <div className="w-1/2 p-6">
        <AddUniversityForm></AddUniversityForm>
      </div>
    </div>
  );
};

export default Home;
