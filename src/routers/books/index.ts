import { Router } from "express";
import listsRouter from "./lists.js";
import bookRouter from "./book.js";
import { getBookGenres } from "../../lib/scrapers/lists.js";

const booksRouter = Router();

booksRouter.get("/test", (req, res) => {
	res.json("Good Morning");
});
booksRouter.get("/genres", async (req, res) => {
	try {
		const content = await getBookGenres(); // Use the getList function
		res.json(content);
	} catch (error) {
		res.status(500).json({ error });
	}
});

booksRouter.use("/lists", listsRouter);
booksRouter.use("/book", bookRouter);

export default booksRouter;
