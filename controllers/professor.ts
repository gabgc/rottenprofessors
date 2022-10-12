import { Professor } from "@prisma/client";
import { AddProfessorModel } from "../components/addProfessorForm";
import prisma from "../prisma/client";

export const findAllProfessors = () => prisma.professor.findMany();
export const findProfessorById = (id: number) =>
  prisma.professor.findUnique({ where: { id } });
export const findProfessorWithIncludeById = (id: number) =>
  prisma.professor.findUnique({
    where: { id },
    include: { university: true, department: true },
  });
export const createProfessor = (professor: AddProfessorModel) =>
  prisma.professor.create({
    data: {
      firstName: professor.firstName,
      lastName: professor.lastName,
      universityId: +professor.universityId,
      departmentId: +professor.departmentId,
      picture: professor.picture,
    },
  });
export const updateProfessor = (id: number, professor: Professor) =>
  prisma.professor.update({ where: { id }, data: professor });
export const deleteProfessor = (id: number) =>
  prisma.professor.delete({ where: { id } });

export const searchProfessor = (searchStr: string) => {
  const splitSearch = searchStr.split(" ");

  if (splitSearch.length === 1) {
    return prisma.professor.findMany({
      where: {
        OR: [
          { firstName: { contains: searchStr, mode: "insensitive" } },
          { lastName: { contains: searchStr, mode: "insensitive" } },
        ],
      },
      orderBy: {
        _relevance: {
          fields: ["firstName", "lastName"],
          sort: "desc",
          search: searchStr,
        },
      },
      take: 10,
    });
  }
  return prisma.professor.findMany({
    where: {
      AND: [
        {
          firstName: {
            contains: splitSearch[0],
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: splitSearch[1],
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      _relevance: {
        fields: ["firstName", "lastName"],
        sort: "desc",
        search: `${splitSearch[0]} <-> ${splitSearch[1]}`,
      },
    },
    take: 10,
  });
};

const professorController = {
  findAllProfessors,
  findProfessorById,
  findProfessorWithIncludeById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  searchProfessor,
};

export default professorController;
