import {
    getAllExpertise
  } from "./expertise.repository.js";

  const getExpertiseAll = async () => {
    const counselor = await getAllExpertise();
    return counselor;
  };

  export {getExpertiseAll};