import db from "../db.js";
import {
  findCounselors,
  findCounselorById,
  updateCounselor,
  deleteCounselor,
} from "./counselor.repository.js";

const getAllCounselor = async () => {
  const counselor = await findCounselors();
  return counselor;
};

const getCounselorById = async (id) => {
  const counselor = await findCounselorById(id);
  return counselor;
};

const editCounselorById = async (counselorData, id) => {
  await updateCounselor(counselorData, id);
};

const deleteCounselorById = async (id) => {
  await deleteCounselor(id);
};

export {
  getAllCounselor,
  getCounselorById,
  editCounselorById,
  deleteCounselorById,
};
