import { findExpertiseByCounselorId } from "./counselor.repository.js";

const getExpertiseHelper = async (counselor_id) => {
  const expertiseRow = await findExpertiseByCounselorId(counselor_id);
  const expertises = [];
  expertiseRow.map((item) => expertises.push(item.type));
  return expertises.join(",");
};

export { getExpertiseHelper };
