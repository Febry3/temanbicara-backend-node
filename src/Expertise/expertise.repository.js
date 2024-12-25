import db from "../db.js";

const getAllExpertise = () => {
    const query = `
    SELECT 
      id AS expertise_id,
      type,
      user_id,
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email
    FROM expertises
    JOIN users ON user_id = users.id
    WHERE users.role = 'Counselor'
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

  export { getAllExpertise};