import express from "express";
import VerifySanctumToken from "./Middleware/verifySanctumToken.js";
import { getAllCounselor } from "./Counselor/counselor.service.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

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

app.use("/api/v1", VerifySanctumToken, productController);
