import express from "express";
import adminRouter from "./admin.js";
import routers from "./routers/index.js";
import cors from "cors";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.NODE_ENV || 5000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", adminRouter);
app.use("/api", routers);
app.listen(PORT, () => {
    console.log(`DeepBooks Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map