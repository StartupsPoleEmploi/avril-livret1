import { uuid } from "../utils/string";

const mapExperience = experience => {
  const map = {
    uuid: experience.uuid || uuid(),
    isCurrent: false,
    role: experience.title,
    companyName: experience.company_name,
    companyAddress: experience.full_address,
    category: experience.job_industry,
    contractType: experience.employment_type,
    activities: experience.skills.map(mapClassification),
    periods: [
      {
        start: experience.start_date,
        end: experience.end_date,
        weekHours: experience.week_hours_duration
      }
    ]
  };
  return map;
};

const mapClassification = data => data.label;

export const backendToStore = {
  identity: backendData => ({
    firstNames: backendData.first_name,
    lastName: backendData.last_name,
    email: backendData.email,
    sex: backendData.gender,
    cellPhoneNumber: backendData.mobile_phone,
    birth: {
      date: backendData.birthday,
      city: backendData.birth_place
    },
    address: backendData.full_address
  }),
  education: backendData => ({
    relatedDegrees: backendData.diplomas.map(mapClassification),
    trainings: backendData.courses.map(mapClassification),
    latestCourseLevel: backendData.grade,
    latestDegree: backendData.degree
  }),
  experiences: backendData => backendData.map(mapExperience)
};
