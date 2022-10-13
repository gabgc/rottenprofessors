import { Professor } from "@prisma/client";
import { useRouter } from "next/router";
import AddProfessorForm from "../../components/addProfessorForm";

const ProfessorPage = () => {
  const router = useRouter();
  return (
    <AddProfessorForm
      onSuccess={(professor: Professor) =>
        router.push("/professor/" + professor.id)
      }
    ></AddProfessorForm>
  );
};

export default ProfessorPage;
