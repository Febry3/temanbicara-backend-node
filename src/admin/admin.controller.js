import express from "express";
import {
    getAllAdmin,
} from "./admin.service.js";
const router = express.Router();
router.get("/admin", async (req, res) => {
    try {
      const admins = await getAllAdmin();
      return res.status(200).json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: admins,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  });

  export default router;