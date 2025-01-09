import { Router } from "express";
import booksRouter from "./books/index.js";
import authRouter from "./auth/index.js";
const routers = Router();

routers.get("/test", (req, res) => {
	res.json("What's up. You are connected to the api.");
});

routers.use("/auth", authRouter);
routers.use("/books", booksRouter);

export default routers;
