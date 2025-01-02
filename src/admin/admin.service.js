import { findAdmin } from "./admin.repository.js";
import { findAdminByEmail } from "./admin.repository.js";
import { deleteAdmin } from "./admin.repository.js";
import { updateAdmin } from "./admin.repository.js";
import axiosClient from "../axios.js";

const getAllAdmin = async () => {
  const admin = await findAdmin();
  console.log(admin);
  return admin;
};

const deleteAdminById = async (id) => {
  await deleteAdmin(id);
};

const editAdminById = async (adminData, id) => {
  await updateAdmin(adminData, id);
};

const verifyAdminPassword = async (email, password) => {
  const admin = await findAdminByEmail(email);
  if (admin.length === 0) {
    throw new Error("Admin not found");
  }

  const match = await bcrypt.compare(password, admin[0].password);
  if (!match) {
    throw new Error("Password is incorrect");
  }

  return admin[0];
};

const createAdmin = async (adminData, token) => {
  const response = await axiosClient.post(
    "admin/admin",
    {
      email: adminData.email,
      password: adminData.password,
      name: adminData.name,
      nickname: adminData.nickname,
      gender: adminData.gender,
      birthdate: adminData.birthdate,
      phone_number: adminData.phone_number,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export {
  getAllAdmin,
  verifyAdminPassword,
  createAdmin,
  deleteAdminById,
  editAdminById,
};
