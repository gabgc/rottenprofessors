import { Course, CourseComment } from "@prisma/client";
import prisma from "../prisma/client";
import { Review } from "./models";

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
    include: {
      Course: true,
    },
  });

export const findCourseCommentById = (id: number) =>
  prisma.courseComment.findUnique({ where: { id } });
export const createCourseComment = async (
  courseComment: Review,
  professorId: number
): Promise<CourseComment & { Course: Course }> => {
  const {
    course,
    section,
    year,
    semester,
    grade,
    comment,
    isAnonymous,
    rating1,
    rating2,
    rating3,
    rating4,
  } = courseComment;

  await prisma.course.update({
    where: { id: course!.id },
    data: {
      Professor: {
        connect: {
          id: professorId,
        },
      },
    },
  });

  if (year && semester && section) {
    const yearParsed = parseInt(year);
    await prisma.courseSection.create({
      data: {
        year: yearParsed,
        section,
        semester,
        courseId: course!.id,
      },
    });
  }

  return await prisma.courseComment.create({
    data: {
      courseId: course!.id,
      comment,
      isAnonymous,
      userGrade: grade,
      rating1,
      rating2,
      rating3,
      rating4,
    },
    include: {
      Course: true,
    },
  });
};

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
