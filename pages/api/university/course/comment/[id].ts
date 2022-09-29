import { NextApiRequest, NextApiResponse } from "next";
import { CourseComment } from "@prisma/client";
import { HttpResponse } from "../../../../../util/http.response.model";
import { findCourseCommentById } from "../../../../../controllers/courseComment";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<CourseComment>>
) => {
  // TODO - create DELETE and PUT handling

  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method not allowed",
    });
    return;
  }

  // validate type of id
  if (req.query.id) {
    const id = parseInt(req.query.id as string);
    if (!isNaN(id)) {
      const courseComment = await findCourseCommentById(id);
      if (courseComment == null) {
        res.status(404).json({
          message: "Course not found",
        });
        return;
      }
      const resBody: HttpResponse<CourseComment> = {
        data: courseComment,
      };
      res.status(200).json(resBody);
      return;
    }
  }
  res.status(400).json({ message: "Bad Request" });
};

export default handler;
