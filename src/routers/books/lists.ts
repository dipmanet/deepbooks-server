import {
	BookListType,
	getBooksByGenre,
	getBooksByListType,
	getBooksBySearch,
} from "../../lib/scrapers/lists.js";
import { Router } from "express";

const listsRouter = Router();

listsRouter.get("/:list_type", async (req, res) => {
	const { list_type } = req.params;
	const { page } = req.query;
	try {
		const list_types = ["latest-release-novel", "hot-novel", "completed-novel", "most-popular"];
		if (list_types.includes(list_type)) {
			const content = await getBooksByListType(list_type as BookListType, Number(page) || 1); // Use the getList function
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid list type" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

listsRouter.get("/genre/:genre", async (req, res) => {
	const { genre } = req.params;
	const { page } = req.query;
	try {
		const list_types = ["harem", "fantansy", "sci-fi", "comedy", "martial", "action"];
		if (list_types.includes(genre)) {
			const content = await getBooksByGenre(genre as string, Number(page) || 1); // Use the getList function
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid list type" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

listsRouter.get("/search/:search_key", async (req, res) => {
	const { search_key } = req.params;
	const { page } = req.query;

	try {
		const list_types = ["latest-release-novel", "hot-novel", "completed-novel", "most-popular"];
		const content = await getBooksBySearch(search_key, Number(page) || 1); // Use the getList function
		res.json(content);
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default listsRouter;
