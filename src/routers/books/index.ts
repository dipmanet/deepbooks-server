import { Router } from "express";
import listsRouter from "./lists.js";
const bookRouter = Router();

bookRouter.get("/test", (req, res) => {
	res.json("Good Morning");
});

bookRouter.use("/lists", listsRouter);

export default bookRouter;
