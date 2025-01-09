import { Router } from "express";
import { getBookChapters, getBookInfo, getChapterContent } from "../../lib/scrapers/book.js";

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
	const { link } = req.query;
	try {
		if (link) {
			const content = await getBookInfo(link as string);
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid book slug" });
		}
	} catch (error) {
		res.status(500).json({ message: "Backend error" });
	}
});

bookRouter.get("/chapters", async (req, res) => {
	const { link } = req.query;
	try {
		if (link) {
			const content = await getBookChapters(link as string);
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid book slug" });
		}
	} catch (error) {
		res.status(500).json({ message: "Backend error" });
	}
});

bookRouter.get("/chapter", async (req, res) => {
	const { chapter_link } = req.query;
	try {
		if (chapter_link) {
			const content = await getChapterContent(chapter_link as string);
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid book slug" });
		}
	} catch (error) {
		res.status(500).json({ message: "Backend error" });
	}
});

export default bookRouter;
