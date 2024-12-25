import db from "../db.js";

const findAdmin = () => {
  const query =
    "SELECT id, email, phone_number, role, name, nickname, gender, birthdate FROM users where role = 'Admin'";
  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};


export { findAdmin};
