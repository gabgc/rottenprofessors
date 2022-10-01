import { Course } from "@prisma/client";
import prisma from "../prisma/client";

export const findAllCourses = () => prisma.course.findMany();
export const findCourseById = (id: number) =>
  prisma.course.findUnique({ where: { id } });
export const createCourse = (course: Course) =>
  prisma.course.create({ data: course });
export const updateCourse = (id: number, course: Course) =>
  prisma.course.update({ where: { id }, data: course });
export const deleteCourse = (id: number) =>
  prisma.course.delete({ where: { id } });
export const searchCourses = (searchStr: string) => {
  const merge = searchStr.split(" ").reduce((acc, curr) => acc + curr);

  return prisma.course.findMany({
    where: {
      code: { contains: merge, mode: "insensitive" },
    },
    orderBy: {
      _relevance: {
        fields: ["code"],
        sort: "desc",
        search: merge,
      },
    },
    take: 10,
  });
};

const courseController = {
  findAllCourses,
  findCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourses,
};

export default courseController;
