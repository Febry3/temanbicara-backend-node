import db from "./db.js";
import express from "express";
import cors from 'cors';
import VerifySanctumToken from "./Middleware/verifySanctumToken.js";
import { getAllCounselor } from "./Counselor/counselor.service.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.use(cors({
  origin: "http://localhost:5173",  
  allowedHeaders: ['Content-Type', 'Authorization']  
}));

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

app.use("/", VerifySanctumToken, productController);
app.use("/", VerifySanctumToken, expertiseController);
app.use("/", VerifySanctumToken, articleController);
app.use("/", VerifySanctumToken, adminController);
