import { Router } from "express";
const authRouter = Router();
authRouter.get("/test", (req, res) => {
    res.json("Good Morning");
});
// authRouter.use("/lists", listsRouter);
export default authRouter;
//# sourceMappingURL=index.js.map