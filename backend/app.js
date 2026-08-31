import express from "express";
import router from "./routes/productRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();
app.use(express.json());

app.use("/api/v1", router);
app.use(errorHandler);
export default app;
