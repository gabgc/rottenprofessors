import { CourseComment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createCourseComment,
  findAllCourseComments,
  findAllCourseCommentsByProfessorId,
} from "../../../../../controllers/courseComment";
import { HttpResponse } from "../../../../../util/http.response.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body) {
      const courseComment = req.body;
      const newCourseComment = await createCourseComment(
        courseComment,
        courseComment.professorId
      );
      const body: HttpResponse<CourseComment> = {
        data: newCourseComment,
      };
      res.status(201).json(body);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    // TODO - courseComment by professor
    if (req.query.professorId) {
      const id = parseInt(req.query.professorId as string);
      if (!isNaN(id)) {
        const courseComments = await findAllCourseCommentsByProfessorId(id);
        const body: HttpResponse<CourseComment[]> = {
          data: courseComments,
        };
        res.status(200).json(body);
        return;
      }
    }
    const courseComments = await findAllCourseComments();
    const body: HttpResponse<CourseComment> = {
      data: courseComments,
    };
    res.status(200).json(body);
  }
};

export default handler;
