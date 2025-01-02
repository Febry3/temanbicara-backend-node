import db from "../db.js";

const getAllConsultation = () => {
    const query = `
    SELECT 
        consultations.consultation_id,
        consultations.status,
        consultations.description,
        consultations.problem,
        consultations.summary,
        consultations.patient_id,
        general_users.name AS general_user_name,
        general_users.birthdate,
        consultations.schedule_id,
        schedules.available_date AS date,
        schedules.start_time,
        schedules.end_time,
        counselors.name AS counselor_name,
        counselors.id as counselor_id
    FROM consultations
    JOIN users AS general_users ON consultations.patient_id = general_users.id
    LEFT JOIN schedules ON consultations.schedule_id = schedules.schedule_id
    LEFT JOIN users AS counselors ON schedules.counselor_id = counselors.id;
`;
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

export { getAllConsultation };
