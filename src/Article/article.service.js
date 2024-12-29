import axiosClient from "../axios.js";
import { updateStatusById } from "./article.repository.js";

import {
    getAllArticle
  } from "./article.repository.js";

  const getArticleAll = async () => {
    const article = await getAllArticle();
    console.log(article)
    return article;
  };

  const updateArticleStatus = async (articleId, newStatus) => {
    try {
        const result = await updateStatusById(articleId, newStatus);
        console.log(result)
        return result;
    } catch (error) {
        throw new Error("Gagal memperbarui status artikel: " + error.message);
    }
};

  export {getArticleAll, updateArticleStatus};