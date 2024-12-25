import db from "../db.js";

const getAllArticle = () => {
  const query = `
    SELECT 
      id AS artikel_id, 
      title, 
      content, 
      image, 
      user_id, 
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


export { getAllArticle };
