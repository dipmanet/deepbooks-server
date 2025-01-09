var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import listsRouter from "./lists.js";
import bookRouter from "./book.js";
import { getBookGenres } from "../../lib/scrapers/lists.js";
const booksRouter = Router();
booksRouter.get("/test", (req, res) => {
    res.json("Good Morning");
});
booksRouter.get("/genres", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield getBookGenres(); // Use the getList function
        res.json(content);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
booksRouter.use("/lists", listsRouter);
booksRouter.use("/book", bookRouter);
export default booksRouter;
//# sourceMappingURL=index.js.map