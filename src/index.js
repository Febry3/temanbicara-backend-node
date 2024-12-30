import express from "express";
import cors from "cors";
import VerifySanctumToken from "./Middleware/verifySanctumToken.js";
import { getAllCounselor } from "./Counselor/counselor.service.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/test", VerifySanctumToken, async (req, res) => {
  try {
    const data = await getAllCounselor();
    res.json({
      token: req.token,
      data: data,
    });
  } catch (error) {
    console.error(error);
  }
});

import productController from "./Counselor/counselor.controller.js";
import expertiseController from "./Expertise/expertise.controller.js";
import articleController from "./Article/article.controller.js";
import adminController from "./admin/admin.controller.js";

app.use("/api/v1", VerifySanctumToken, productController);
app.use("/api/v1", VerifySanctumToken, expertiseController);
app.use("/api/v1", VerifySanctumToken, articleController);
app.use("/api/v1", VerifySanctumToken, adminController);
app.use("/api/v1", VerifySanctumToken, productController);
