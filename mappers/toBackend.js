import get from "lodash.get";
import { formatISODate } from "../utils/time";

const mapExperience = experience => ({
  uuid: experience.uuid,
  title: experience.role,
  company_name: experience.companyName,
  full_address: Object.assign({}, experience.companyAddress, {
    postal_code: get(experience, "companyAdress.postalCode")
  }),
  job_industry: experience.category,
  employment_type: experience.contractType,
  skills: experience.activities.map(mapClassification),
  periods: experience.periods.map(period => ({
    start_date: formatISODate(period.start),
    end_date: formatISODate(period.end),
    week_hours_duration: period.weekHours
  }))
});

const mapClassification = classification => ({
  label: classification
});

export const storeToBackend = {
  index: state => ({
    completed_at: formatISODate(state.completedAt, 'complete'),
    certification_name: state.certificationLabel,
    certifier_name: state.certifierLabel,
  }),
  identity: state => ({
    first_name: state.firstNames,
    last_name: state.lastName,
    email: state.email,
    gender: state.sex,
    mobile_phone: state.cellPhoneNumber,
    birthday: formatISODate(state.birthday),
    birth_place: state.birthPlace,
    is_handicapped: state.isHandicapped,
    current_situation: {
      status: state.status,
      employment_type: get(state, "currentSituation.employmentType"),
      register_to_pole_emploi: get(
        state,
        "currentSituation.registerToPoleEmploi"
      ),
      register_to_pole_emploi_since: get(
        state,
        "currentSituation.registerToPoleEmploiSince"
      ),
      compensation_type: get(state, "currentSituation.compensationType")
    },
    nationality: Object.assign({}, state.nationality),
    full_address: Object.assign({}, state.address, {
      postal_code: get(state, "address.postalCode")
    })
  }),
  education: state => ({
    grade: state.latestCourseLevel,
    degree: state.latestDegree,
    diplomas: state.relatedDegrees.map(mapClassification),
    courses: state.trainings.map(mapClassification)
  }),
  experiences: state => state.map(mapExperience)
};
