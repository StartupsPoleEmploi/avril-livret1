const mapExperience = experience => ({
  uuid: experience.uuid,
  title: experience.role,
  company_name: experience.companyName,
  full_address: experience.companyName,
  job_industry: experience.category,
  employment_type: experience.contractTyoe,
  skills: experience.activities.map(mapClassification),
  start_date: (experience.periods[0] || {}).start,
  end_date: (experience.periods[0] || {}).end,
  week_hours_duration: (experience.periods[0] || {}).weekHours
});

const mapClassification = classification => ({
  label: classification
});

export const storeToBackend = {
  identity: state => ({
    first_name: state.firstNames,
    last_name: state.lastName,
    email: state.email,
    gender: state.sex,
    mobile_phone: state.cellPhoneNumber,
    birthday: state.birthday,
    birth_place: state.birthPlace,
    full_address: state.address
  }),
  education: state => ({
    grade: state.latestCourseLevel,
    degree: state.latestDegree,
    diplomas: state.relatedDegrees.map(mapClassification),
    courses: state.trainings.map(mapClassification)
  }),
  experiences: state => state.map(mapExperience)
};
