import db from "../db.js";

const findCounselors = () => {
  const query =
    "SELECT id, email, phone_number, role, name, nickname, gender, birthdate FROM users where role = 'Counselor'";
  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const findCounselorById = (id) => {
  const query =
    "SELECT id, email, phone_number, role, name, nickname, gender, birthdate FROM users WHERE id = ? AND role = 'Counselor'";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

const updateCounselor = (counselorData, id) => {
  const query =
    "UPDATE users SET email = ?, phone_number = ?, name = ?, nickname = ?, gender = ?, birthdate = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        counselorData.email,
        counselorData.phone_number,
        counselorData.name,
        counselorData.nickname,
        counselorData.gender,
        counselorData.birthdate,
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

const deleteCounselor = (id) => {
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

const insertExpertise = (expertiseData) => {
  const query = "INSERT INTO `expertises`(`type`, `user_id`) VALUES (?,?)";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [expertiseData.type, expertiseData.counselor_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

const findExpertiseByCounselorId = (counselor_id) => {
  const query = "SELECT type from expertises where user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [counselor_id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

export {
  findCounselors,
  findCounselorById,
  updateCounselor,
  deleteCounselor,
  insertExpertise,
  findExpertiseByCounselorId,
};
