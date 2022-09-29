import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "@prisma/client";
import { HttpResponse } from "../../../../util/http.response.model";
import { findCourseById } from "../../../../controllers/course";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<Course>>
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
      const course = await findCourseById(id);
      if (course == null) {
        res.status(404).json({
          message: "Course not found",
        });
        return;
      }
      const resBody: HttpResponse<Course> = {
        data: course,
      };
      res.status(200).json(resBody);
      return;
    }
  }
  res.status(400).json({ message: "Bad Request" });
};

export default handler;
