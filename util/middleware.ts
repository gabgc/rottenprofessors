import { NextApiRequest, NextApiResponse } from "next";

type ApiHandler<T> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<void>;

export function authMiddleware<T>(apiHandler: ApiHandler<T>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.authorization) {
      // TODO - better error handling
      return res.status(401).json({ message: "Unauthorized" });
    }
    return apiHandler(req, res);
  };
}
