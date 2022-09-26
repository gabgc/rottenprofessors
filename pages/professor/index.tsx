import { Professor } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import prisma from "../../prisma/client";

const ProfessorPage = ({
  professors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {professors.map((professor: Professor) => (
        <div key={professor.id}>{professor.firstName}</div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const professors = await prisma.professor.findMany();
  return { props: { professors } };
}

export default ProfessorPage;
