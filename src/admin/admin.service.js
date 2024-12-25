import {
    findAdmin
  } from "./admin.repository.js";

  const getAllAdmin = async () => {
    const admin = await findAdmin();
    console.log(admin)
    return admin;
  };

  export {getAllAdmin};