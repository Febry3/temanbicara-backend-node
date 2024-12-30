import db from "../db.js";

const getAllArticle = () => {
  const query = `
    SELECT 
      artikel_id, 
      title, 
      content, 
      image, 
      status,
      user_id, 
      artikels.created_at,
      users.id AS user_id, 
      users.name AS user_name, 
      users.role AS user_role
    FROM artikels
    JOIN users ON artikels.user_id = users.id
  `;
  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const updateStatusById = (articleId, newStatus) => {
  const query = `
      UPDATE artikels
      SET status = ?
      WHERE artikel_id = ?
  `;

  return new Promise((resolve, reject) => {
      db.query(query, [newStatus, articleId], (error, results) => {
          if (error) {
              reject(error);
          }
          resolve(results);
      });
  });
};

export { getAllArticle, updateStatusById };
