import { Course } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createCourse,
  findAllCourses,
  searchCourses,
} from "../../../../controllers/course";
import { HttpResponse } from "../../../../util/http.response.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body) {
      const course = req.body as Course;
      const newcourse = await createCourse(course);
      const body: HttpResponse<Course> = {
        data: newcourse,
      };
      res.status(201).json(body);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    // TODO - course by department, course by university, course by professor
    if (req.query.search) {
      const search = req.query.search as string;
      const courses = await searchCourses(search);
      const body: HttpResponse<Course> = {
        data: courses,
      };
      res.status(200).json(body);
    }
  }
};

export default handler;
