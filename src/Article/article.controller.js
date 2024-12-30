import express from "express";
import { getArticleAll } from "./article.service.js";
const router = express.Router();
router.get("/article", async (req, res) => {
  try {
    const articles = await getArticleAll();
    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data",
      data: articles,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

export default router;
