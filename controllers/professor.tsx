import { Professor } from "@prisma/client";
import prisma from "../prisma/client";

export const findAllProfessors = () => prisma.professor.findMany();
export const findProfessorById = (id: number) =>
  prisma.professor.findUnique({ where: { id } });
export const createProfessor = (professor: Professor) =>
  prisma.professor.create({ data: professor });
export const updateProfessor = (id: number, professor: Professor) =>
  prisma.professor.update({ where: { id }, data: professor });
export const deleteProfessor = (id: number) =>
  prisma.professor.delete({ where: { id } });

export const searchProfessor = (search: string) => {
  return prisma.professor.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      _relevance: {
        fields: ["firstName", "lastName"],
        search: search,
        sort: "desc",
      },
    },
    take: 10,
  });
};

const professorController = {
  findAllProfessors,
  findProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  searchProfessor,
};

export default professorController;
