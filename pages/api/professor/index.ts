import { NextApiRequest, NextApiResponse } from "next";
import { Professor } from "@prisma/client";
import prisma from "../../../prisma/client";
import { HttpResponse } from "../../../util/http.response.model";
import {
  createProfessor,
  findAllProfessors,
} from "../../../controllers/professor";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<Professor>>
) => {
  if (req.method === "POST") {
    if (req.body) {
      const professor = req.body as Professor;
      const newProfessor = await createProfessor(professor);

      const resBody: HttpResponse<Professor> = {
        data: newProfessor,
      };
      res.status(201).json(resBody);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    const professors = await findAllProfessors();
    const resBody: HttpResponse<Professor> = {
      data: professors,
    };
    res.status(200).json(resBody);
  }
};

export default handler;
