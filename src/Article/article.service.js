import {
    getAllArticle
  } from "./article.repository.js";

  const getArticleAll = async () => {
    const article = await getAllArticle();
    console.log(article)
    return article;
  };

  export {getArticleAll};