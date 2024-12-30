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

const findAdminByEmail = (email) => {
  const query =
    "SELECT id, email, phone_number, role, name, nickname, gender, birthdate, password FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const deleteAdmin = (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const updateAdmin = (adminData, id) => {
  const query =
    "UPDATE users SET email = ?, phone_number = ?, name = ?, nickname = ?, gender = ?, birthdate = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        adminData.email,
        adminData.phone_number,
        adminData.name,
        adminData.nickname,
        adminData.gender,
        adminData.birthdate,
        id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};


export { findAdmin, findAdminByEmail, deleteAdmin, updateAdmin};
