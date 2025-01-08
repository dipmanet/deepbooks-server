import { Router } from "express";
import { BookListType, getNovelLists } from "../../lib/scrapers/lists.js";

const listsRouter = Router();

listsRouter.get("/", (req, res) => {
	res.json("Specify name of the list");
});

listsRouter.get("/:list_type", async (req, res) => {
	const { list_type } = req.params;
	try {
		const list_types = ["latest-release-novel", "hot-novel", "completed-novel", "most-popular"];
		if (list_types.includes(list_type)) {
			const content = await getNovelLists(list_type as BookListType); // Use the getList function
			res.json(content);
		} else {
			res.status(400).json({ message: "Invalid list type" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default listsRouter;
