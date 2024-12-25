import express from "express";
import {
    getExpertiseAll,
} from "./expertise.service.js";
const router = express.Router();
router.get("/Expertise", async (req, res) => {
    try {
      const counselors = await getExpertiseAll();
      return res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: counselors,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  });

  export default router;