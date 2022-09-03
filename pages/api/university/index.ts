import { NextApiRequest, NextApiResponse } from "next";
import { University } from "@prisma/client";
import {
  createUniversity,
  findAllUniversities,
} from "../../../controllers/university";
import { HttpResponse } from "../../../util/http.response.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body) {
      const university = req.body as University;
      const newUniversity = await createUniversity(university);
      const body: HttpResponse<University> = {
        data: newUniversity,
      };
      res.status(201).json(body);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    const universities = await findAllUniversities();
    const body: HttpResponse<University> = {
      data: universities,
    };
    res.status(200).json(body);
  }
};

export default handler;
