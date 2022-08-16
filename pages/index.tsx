import { Professor } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import AddProfessorForm from "../components/addProfessorForm";
import AddUniversityForm from "../components/addUniversityForm";
import Navbar from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AdminPanel></AdminPanel>
      <AddUniversityForm></AddUniversityForm>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <div>
      <AddProfessorForm></AddProfessorForm>
    </div>
  );
};

export default Home;
