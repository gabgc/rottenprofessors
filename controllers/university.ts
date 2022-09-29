import { University } from "@prisma/client";
import prisma from "../prisma/client";

export const findAllUniversities = () => prisma.university.findMany();
export const findUniversityById = (id: number) =>
  prisma.university.findUnique({ where: { id } });
export const createUniversity = (university: University) =>
  prisma.university.create({ data: university });
export const updateUniversity = (id: number, university: University) =>
  prisma.university.update({ where: { id }, data: university });
export const deleteUniversity = (id: number) =>
  prisma.university.delete({ where: { id } });

const universityController = {
  findAllUniversities,
  findUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};

export default universityController;
