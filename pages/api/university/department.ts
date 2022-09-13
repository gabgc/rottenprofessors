import { Department } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { HttpResponse } from "../../../util/http.response.model";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<Department | null>>
) => {
  if (req.method !== "GET") {
    const response: HttpResponse<null> = {
      message: "Method not allowed",
    };
    res.status(405).json(response);
    return;
  }

  const departments = await prisma.department.findMany();
  const response: HttpResponse<Department> = {
    data: departments,
  };
  res.status(200).json(response);
};

export default handler;
