import { Router } from "express";
const routers = Router();
routers.get("/test", (req, res) => {
    res.json("Good Morning");
});
// routers.use("/lists", listsRouter);
export default routers;
//# sourceMappingURL=index.js.map