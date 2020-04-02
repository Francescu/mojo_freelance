import type {Request, Response} from "express";

import * as express from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world!" });
});

export default app;