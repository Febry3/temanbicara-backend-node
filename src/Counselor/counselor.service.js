import axiosClient from "../axios.js";
import db from "../db.js";
import {
  findCounselors,
  findCounselorById,
  updateCounselor,
  deleteCounselor,
  insertExpertise,
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

const createCounselor = async (counselorData, token) => {
  const response = await axiosClient.post(
    "admin/counselor",
    {
      email: counselorData.email,
      password: counselorData.password,
      name: counselorData.name,
      nickname: counselorData.nickname,
      gender: counselorData.gender,
      birthdate: counselorData.birthdate,
      phone_number: counselorData.phone_number,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const createExpertise = async (expertiseData) => {
  await insertExpertise(expertiseData);
};

export {
  getAllCounselor,
  getCounselorById,
  editCounselorById,
  deleteCounselorById,
  createCounselor,
  createExpertise,
};
