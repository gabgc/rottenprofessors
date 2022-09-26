import { Department, Professor, University } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { NextPageContext } from "next";
import professorController from "../../controllers/professor";

interface ProfessorPageProps {
  professor: Professor & {
    university: University;
    department: Department | null;
  };
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
  const {
    firstName,
    lastName,
    university,
    department,
    overallRating,
    picture,
  } = props.professor;

  return (
    <div className="p-5 lg:p-10">
      <div className="flex justify-center shadow-lg bg-green-100 rounded-lg">
        <div className="p-6 mt-6">
          <div className="text-3xl text-center font-bold">
            {firstName} {lastName}
          </div>
          <div className="text-xl text-center text-gray-700">
            {university.name}, {department?.name} Department
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  if (id && typeof id === "string") {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      const professor = await professorController.findProfessorWithIncludeById(
        parsedId
      );
      return professor
        ? { props: { professor, status: 200 } }
        : { props: { professor: null, status: 404 } };
    }
    return { props: { professor: null, status: 405 } };
  }
  return { props: { professor: null, status: 500 } };
}

export default ProfessorPageWrapper;
