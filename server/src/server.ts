import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("server is runnig ");
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server is runnig on port ${PORT}`));
