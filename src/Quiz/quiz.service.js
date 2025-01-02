import {
    getAllQuiz
} from "./quiz.repository.js";

const getQuizAll = async () => {
    const quiz = await getAllQuiz();
    return quiz;
};

export { getQuizAll };