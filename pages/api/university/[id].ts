import { NextApiRequest, NextApiResponse } from "next";
import { University } from "@prisma/client";
import { HttpResponse } from "../../../util/http.response.model";
import { findUniversityById } from "../../../controllers/university";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<University>>
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
      const university = await findUniversityById(id);
      if (university == null) {
        res.status(404).json({
          message: "University not found",
        });
        return;
      }
      const resBody: HttpResponse<University> = {
        data: university,
      };
      res.status(200).json(resBody);
      return;
    }
  }
  res.status(400).json({ message: "Bad Request" });
};

export default handler;
