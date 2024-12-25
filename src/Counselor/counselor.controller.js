import express from "express";
import {
  getAllCounselor,
  getCounselorById,
  editCounselorById,
  deleteCounselorById,
  createCounselor,
} from "./counselor.service.js";

const router = express.Router();

router.get("/counselor", async (req, res) => {
  try {
    const counselors = await getAllCounselor();
    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data",
      data: counselors,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error,
    });
  }
});

router.get("/counselor/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const counselor = await getCounselorById(id);
    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data",
      data: counselor,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error,
    });
  }
});

router.put("/counselor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const counselorData = req.body;

    await editCounselorById(counselorData, id);
    return res.status(200).json({
      status: true,
      message: "Berhasil merubah data",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error,
    });
  }
});

router.delete("/counselor/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteCounselorById(id);
    return res.status(200).json({
      status: true,
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error,
    });
  }
});

router.post("/counselor", async (req, res) => {
  try {
    const token = req.token;
    const counselorData = req.body;

    const response = await createCounselor(counselorData, token);

    console.log(response);
    if (response.status === false) {
      return res.status(200).json({
        status: false,
        message: response.message.email || response.message.phone_number,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Berhasil membuat akun",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.response.data.message,
    });
  }
});

export default router;
