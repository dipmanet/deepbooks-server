import { Router } from "express";
import listsRouter from "./lists.js";
const routers = Router();
routers.get("/test", (req, res) => {
    res.json("Good Morning");
});
routers.use("/lists", listsRouter);
export default routers;
//# sourceMappingURL=index.js.map