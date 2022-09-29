import { CourseComment } from "@prisma/client";
import prisma from "../prisma/client";

export const findAllCourseComments = () => prisma.courseComment.findMany();
export const findAllCourseCommentsByProfessorId = (professorId: number) =>
  prisma.courseComment.findMany({
    include: {
      Course: true,
    },
    where: {
      Course: {
        professorId: professorId,
      },
    },
  });
export const findCourseCommentById = (id: number) =>
  prisma.courseComment.findUnique({ where: { id } });
export const createCourseComment = (CourseComment: CourseComment) =>
  prisma.courseComment.create({ data: CourseComment });
export const updateCourseComment = (id: number, CourseComment: CourseComment) =>
  prisma.courseComment.update({ where: { id }, data: CourseComment });
export const deleteCourseComment = (id: number) =>
  prisma.courseComment.delete({ where: { id } });

const CourseCommentController = {
  findAllCourseComments,
  findCourseCommentById,
  createCourseComment,
  updateCourseComment,
  deleteCourseComment,
};

export default CourseCommentController;
