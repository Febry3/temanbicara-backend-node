import { getAllConsultation } from "./consultation.repository.js";

const getConsult = async () => {
    const consult = await getAllConsultation();
    return consult;
};

export { getConsult };