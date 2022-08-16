import { NextApiRequest, NextApiResponse } from "next";
import { Professor } from "@prisma/client";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body) {
      const professor = req.body as Professor;
      const createProfessor = await prisma.professor.create({
        data: professor,
      });
      res.status(201).json(createProfessor);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    const professors = await prisma.professor.findMany();
    res.status(200).json(professors);
  }
};

export default handler;
