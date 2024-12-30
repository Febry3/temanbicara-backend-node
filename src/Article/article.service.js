import { getAllArticle } from "./article.repository.js";

const getArticleAll = async () => {
  const article = await getAllArticle();
  return article;
};

export { getArticleAll };
