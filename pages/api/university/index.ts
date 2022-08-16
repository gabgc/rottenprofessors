import { NextApiRequest, NextApiResponse } from "next";
import { University } from "@prisma/client";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (req.body) {
      const university = req.body as University;
      const createProfessor = await prisma.university.create({
        data: university,
      });
      res.status(201).json(createProfessor);
    } else {
      res.status(400);
    }
  } else if (req.method === "GET") {
    const universities = await prisma.university.findMany();
    res.status(200).json(universities);
  }
};

export default handler;
