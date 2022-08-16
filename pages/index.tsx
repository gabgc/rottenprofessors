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
    <div>
      <AddProfessorForm></AddProfessorForm>
      <AddUniversityForm></AddUniversityForm>
    </div>
  );
};

export default Home;
