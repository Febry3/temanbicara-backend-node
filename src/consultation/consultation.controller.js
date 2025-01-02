import express from "express";

import { getConsult } from "./consultation.service.js";

const router = express.Router();
router.get("/consultation", async (req, res) => {
  try {
    console.log(req.token);
    const consult = await getConsult();
    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data",
      data: consult,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

export default router;