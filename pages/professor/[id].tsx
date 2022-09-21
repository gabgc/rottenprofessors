import { Professor } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { NextPageContext } from "next";
import professorController from "../../controllers/professor";

interface ProfessorPageProps {
  professor: Professor;
}

const ProfessorPageWrapper = ({
  professor,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return status === 200 ? (
    <ProfessorPage professor={professor}></ProfessorPage>
  ) : (
    <div>Error {status}</div>
  );
};

const ProfessorPage = (props: ProfessorPageProps) => {
  return <div>{props.professor.firstName}</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  if (id && typeof id === "string") {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      const professor = await professorController.findProfessorById(parsedId);
      return professor
        ? { props: { professor, status: 200 } }
        : { props: { professor: null, status: 404 } };
    }
    return { props: { professor: null, status: 405 } };
  }
  return { props: { professor: null, status: 500 } };
}

export default ProfessorPageWrapper;
