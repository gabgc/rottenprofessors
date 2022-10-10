import { CourseComment } from "@prisma/client";
import prisma from "../prisma/client";

export const findAllCourseComments = () => prisma.courseComment.findMany();
export const findAllCourseCommentsByProfessorId = (professorId: number) =>
  prisma.courseComment.findMany({
    where: {
      Course: {
        Professor: {
          every: {
            id: professorId,
          },
        },
      },
    },
  });

export const findCourseCommentById = (id: number) =>
  prisma.courseComment.findUnique({ where: { id } });
export const createCourseComment = (
  courseComment: CourseComment,
  professorId: number
) =>
  prisma.courseComment.create({
    data: {
      comment: courseComment.comment,
      rating1: courseComment.rating1,
      rating2: courseComment.rating2,
      rating3: courseComment.rating3,
      rating4: courseComment.rating4,
      isAnonymous: courseComment.isAnonymous,
      userGrade: courseComment.userGrade,
      Course: {
        connect: {
          id: courseComment.courseId,
        },
        Professor: {
          connect: {
            id: professorId,
          },
        },
      },
    },
  });

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
