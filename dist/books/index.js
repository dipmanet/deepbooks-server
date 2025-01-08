import { Router } from "express";
const bookRouters = Router();
bookRouters.get("/test", (req, res) => {
    res.json("Good Morning");
});
// bookRouters.use("/lists", listsRouter);
export default bookRouters;
//# sourceMappingURL=index.js.map