var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getNovelLists } from "../lib/scrapers/lists.js";
import { Router } from "express";
const listsRouter = Router();
listsRouter.get("/", (req, res) => {
    res.json("Specify name of the list");
});
listsRouter.get("/:list_type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list_type } = req.params;
    try {
        const list_types = ["latest-release-novel", "hot-novel", "completed-novel", "most-popular"];
        if (list_types.includes(list_type)) {
            const content = yield getNovelLists(list_type); // Use the getList function
            res.json(content);
        }
        else {
            res.status(400).json({ message: "Invalid list type" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
export default listsRouter;
//# sourceMappingURL=lists.js.map