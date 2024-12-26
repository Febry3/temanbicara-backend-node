import express from "express";

import {
  getArticleAll, updateArticleStatus,
} from "./article.service.js";


const router = express.Router();
router.get("/article", async (req, res) => {
  try {
    console.log(req.token);
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


router.put("/article/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // console.log(status);

  try {
      if (!["Pending", "Published", "Rejected"].includes(status)) {
          return res.status(400).json({
              status: false,
              message: "Status tidak valid. Harus 'Pending', 'Published', atau 'Rejected'.",
          });
      }

      const result = await updateArticleStatus(id, status);

      if (result.affectedRows === 0) {
          return res.status(404).json({
              status: false,
              message: "Artikel tidak ditemukan.",
          });
      }

      return res.status(200).json({
          status: true,
          message: "Status artikel berhasil diperbarui.",
      });
  } catch (error) {
      return res.status(500).json({
          status: false,
          message: error.message,
      });
  }
});

export default router;