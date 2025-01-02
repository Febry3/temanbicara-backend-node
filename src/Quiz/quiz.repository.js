import db from "../db.js";

const getAllQuiz = () => {
  const query = `
    SELECT 
        quizzes.quiz_id,
        quizzes.question,
        users.id AS user_id,
        answers.answer_id,
        answers.option,
        answers.point
    FROM users
    JOIN quizzes 
    ON users.id = quizzes.user_id
    LEFT JOIN answers
    ON quizzes.quiz_id = answers.quiz_id
    `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      // Memproses hasil query untuk mengelompokkan opsi berdasarkan quiz_id
      const quizzes = results.reduce((acc, row) => {
        const existingQuiz = acc.find((q) => q.quiz_id === row.quiz_id);
        const answer = {
          answer_id: row.answer_id,
          option: row.option,
          point: row.point,
        };

        if (existingQuiz) {
          // Jika quiz_id sudah ada, tambahkan opsi ke dalam array answers
          existingQuiz.answers.push(answer);
        } else {
          // Jika quiz_id belum ada, buat objek quiz baru
          acc.push({
            quiz_id: row.quiz_id,
            question: row.question,
            user_id: row.user_id,
            answers: row.option ? [answer] : [], // Tambahkan opsi hanya jika ada
          });
        }

        return acc;
      }, []);

      resolve(quizzes);
    });
  });
};

const addQuiz = ({ question, user_id, answers }) => {
  return new Promise((resolve, reject) => {
    // Masukkan data ke tabel quizzes
    const queryQuiz = "INSERT INTO quizzes (question, user_id) VALUES (?, ?)";
    db.query(queryQuiz, [question, user_id], (error, quizResult) => {
      if (error) return reject(error); // Jika ada error saat memasukkan quiz

      const quizId = quizResult.insertId;

      // Masukkan data ke tabel answers
      const queryAnswers =
        "INSERT INTO `answers`(`option`, `point`, `quiz_id`) VALUES (?, ?, ?)";
      let answerPromises = answers.map((answer) => {
        return new Promise((resolveAnswer, rejectAnswer) => {
          db.query(
            queryAnswers,
            [answer.option, answer.point, quizId],
            (error) => {
              if (error) return rejectAnswer(error); // Jika error, reject promise untuk answer
              resolveAnswer(); // Resolusi promise untuk answer
            }
          );
        });
      });

      // Tunggu semua promise untuk answers selesai
      Promise.all(answerPromises)
        .then(() =>
          resolve({
            quiz_id: quizId,
            message: "Quiz and answers added successfully!",
          })
        )
        .catch((error) => reject(error)); // Gagal jika ada error di answer
    });
  });
};

const deleteQuiz = (quizId) => {
  return new Promise((resolve, reject) => {
    // Mulai transaksi
    db.beginTransaction((err) => {
      if (err) return reject(err);

      // Hapus data dari tabel answers
      const queryDeleteAnswers = "DELETE FROM answers WHERE quiz_id = ?";
      db.query(queryDeleteAnswers, [quizId], (err) => {
        if (err) {
          return db.rollback(() => reject(err));
        }

        // Hapus data dari tabel quizzes
        const queryDeleteQuiz = "DELETE FROM quizzes WHERE quiz_id = ?";
        db.query(queryDeleteQuiz, [quizId], (err, results) => {
          if (err) {
            return db.rollback(() => reject(err));
          }

          // Commit transaksi jika berhasil
          db.commit((err) => {
            if (err) {
              return db.rollback(() => reject(err));
            }
            resolve({
              message: "Quiz and related answers deleted successfully",
              affectedRows: results.affectedRows,
            });
          });
        });
      });
    });
  });
};

const updateQuiz = (quizId, question, userId, answers) => {
  return new Promise((resolve, reject) => {
    // Mulai transaksi
    db.beginTransaction((err) => {
      if (err) return reject(err);

      // Update data di tabel quizzes
      const queryUpdateQuiz =
        "UPDATE quizzes SET question = ?, user_id = ? WHERE quiz_id = ?";
      db.query(queryUpdateQuiz, [question, userId, quizId], (err) => {
        if (err) {
          return db.rollback(() => reject(err));
        }

        // Update data di tabel answers
        const queryUpdateAnswers =
          "UPDATE answers SET option = ?, point = ? WHERE quiz_id = ? AND answer_id = ?";
        const updateAnswerPromises = answers.map((answer) => {
          return new Promise((resolve, reject) => {
            db.query(
              queryUpdateAnswers,
              [answer.option, answer.point, quizId, answer.answer_id],
              (err, results) => {
                if (err) {
                  return reject(err);
                }
                resolve(results);
              }
            );
          });
        });

        // Jalankan semua update answers
        Promise.all(updateAnswerPromises)
          .then(() => {
            // Commit transaksi jika berhasil
            db.commit((err) => {
              if (err) {
                return db.rollback(() => reject(err));
              }
              resolve({
                message: "Quiz and related answers updated successfully",
              });
            });
          })
          .catch((err) => {
            // Rollback jika salah satu gagal
            db.rollback(() => reject(err));
          });
      });
    });
  });
};

export { getAllQuiz, addQuiz, deleteQuiz, updateQuiz };
