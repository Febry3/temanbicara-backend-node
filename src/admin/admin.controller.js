import express from "express";
import { getAllAdmin, verifyAdminPassword, createAdmin, deleteAdminById, editAdminById } from "./admin.service.js";

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

router.delete("/admin/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteAdminById(id);
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

router.post("/admin/verify-password", async (req, res) => {
  const { email, password } = req.body; 
  try {
    const admin = await verifyAdminPassword(email, password);
    return res.status(200).json({
      status: true,
      message: "Password matched successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const token = req.token;
    const adminData = req.body;

    const response = await createAdmin(adminData, token);

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

router.put("/admin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const adminData = req.body;

    await editAdminById(adminData, id);
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

export default router;