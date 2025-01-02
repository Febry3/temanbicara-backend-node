import express from "express";

import {
    getQuizAll,
} from "./quiz.service.js";
import { addQuiz, deleteQuiz, updateQuiz } from "./quiz.repository.js";

const router = express.Router();
router.get("/Quiz", async (req, res) => {
    const quiz = await getQuizAll();
    try {
        return res.status(200).json({
            status: true,
            message: "Berhasil mendapatkan data",
            data: quiz,
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            data: quiz,
        });
    }
});

router.post("/Quiz", async (req, res) => {
    try {
        const quizData = req.body;

        // Validasi data quiz yang diterima
        if (!quizData.question || !quizData.user_id || !quizData.answers || quizData.answers.length === 0) {
            return res.status(400).json({
                status: false,
                message: 'Data quiz tidak lengkap'
            });
        }

        // Menambahkan quiz dengan memanggil fungsi addQuiz
        const response = await addQuiz(quizData);

        // Mengecek apakah response memiliki quiz_id
        if (!response || !response.quiz_id) {
            return res.status(400).json({
                status: false,
                message: 'Gagal menyimpan quiz'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Quiz berhasil disimpan',
            data: response
        });
    } catch (error) {
        console.error(error);

        const message = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        return res.status(400).json({
            status: false,
            message: message,
        });
    }
});

router.put('/Quiz/:id', async (req, res) => {
    const quizId = req.params.id; // Ambil quizId dari URL parameter
    const { question, userId, answers } = req.body; // Ambil data dari body request

    // Validasi input
    if (!quizId || !question || !userId || !Array.isArray(answers)) {
        return res.status(400).json({
            message: "Invalid input. Please provide quizId, question, userId, and answers array.",
        });
    }

    try {
        // Panggil fungsi repository untuk update data
        const result = await updateQuiz(quizId, question, userId, answers);

        // Kirim respons sukses
        // res.status(200).json({
        //     message: result.message,
        // });
        if (result) {
            return res.status(200).send({ status: "success", message: "Quiz berhasil dihapus" });
          } else {
            return res.status(404).send({ status: "error", message: "Quiz tidak ditemukan" });
          }
    } catch (err) {
        // Tangani error
        console.error("Error updating quiz:", err);
        // res.status(500).json({
        //     message: "Failed to update quiz. Please try again later.",
        //     error: err.message,
        // });
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
});

router.delete('/Quiz/:id', async (req, res) => {
    const quizId = req.params.id;
    try {
        // Logika penghapusan quiz dari database
        const result = await deleteQuiz(quizId);
        return res.status(200).json({
            status: true,
            message: result.message,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Failed to delete quiz",
        });
    }
});

export default router;