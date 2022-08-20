import { NextApiRequest, NextApiResponse } from "next";
import { Professor } from "@prisma/client";
import prisma from "../../../prisma/client";
import { HttpResponse } from "../../../util/http.response.model";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<Professor>>
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
      const professor = await prisma.professor.findUnique({
        where: {
          id,
        },
      });
      if (professor == null) {
        res.status(404).json({
          message: "Professor not found",
        });
        return;
      }
      const resBody: HttpResponse<Professor> = {
        data: professor,
      };
      res.status(200).json(resBody);
      return;
    }
  }
  res.status(400).json({ message: "Bad Request" });
};

export default handler;
