import type { Request, Response } from "express";

import express from "express";

import getSkills from "./freelancers/get-skills";

const server = express();

const notFound = (req: Request, res: Response) => {
  res.status(404).json({});
};

server.get("/freelancer/:id/skills", getSkills);
server.use(notFound);

export default server;
