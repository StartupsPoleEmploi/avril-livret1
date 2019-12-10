import parseISO from 'date-fns/parseISO';
import get from "lodash.get";
import { uuid } from "../utils/string";
import { parseDate } from "../utils/time";

const mapClassification = data => data.label;

const mapExperience = experience => {
  const map = {
    uuid: experience.uuid || uuid(),
    isCurrent: false,
    role: experience.title,
    companyName: experience.company_name,
    companyAddress: Object.assign({}, experience.full_address, {
      postalCode: get(experience, "full_address.postal_code", {})
    }),
    contractType: experience.employment_type,
    category: experience.job_industry,
    activities: experience.skills.map(mapClassification),
    periods: experience.periods.map(period => ({
      start: parseDate(period.start_date),
      end: parseDate(period.end_date),
      weekHours: period.week_hours_duration
    }))
  };
  return map;
};

export const backendToStore = {
  index: backendData => ({
    hash: backendData.hash,
    certificationLabel: backendData.certification_name,
    certifierLabel: backendData.certifier_name
  }),
  identity: backendData => ({
    firstNames: backendData.first_name,
    lastName: backendData.last_name,
    email: backendData.email,
    sex: backendData.gender,
    cellPhoneNumber: backendData.mobile_phone,
    birthday: parseDate(backendData.birthday),
    isHandicapped: backendData.is_handicapped,
    currentSituation: {
      status: get(backendData, "current_situation.status"),
      employmentType: get(backendData, "current_situation.employment_type"),
      registerToPoleEmploi: get(
        backendData,
        "current_situation.register_to_pole_emploi"
      ),
      registerToPoleEmploiSince: parseDate(get(
        backendData,
        "current_situation.register_to_pole_emploi_since"
      )),
      compensationType: get(
        backendData,
        "current_situation.compensation_type"
      ),
    },
    birthPlace: {
      city: get(backendData, "birth_place.city"),
      country: get(backendData, "birth_place.country"),
      lat: get(backendData, "birth_place.lat"),
      lng: get(backendData, "birth_place.lng")
    },
    address: {
      street: get(backendData, "full_address.street"),
      city: get(backendData, "full_address.city"),
      postalCode: get(backendData, "full_address.postal_code"),
      country: get(backendData, "full_address.country"),
      lat: get(backendData, "full_address.lat"),
      lng: get(backendData, "full_address.lng")
    }
  }),
  education: backendData => ({
    relatedDegrees: get(backendData, "diplomas", []).map(mapClassification),
    trainings: get(backendData, "courses", []).map(mapClassification),
    latestCourseLevel: backendData.grade,
    latestDegree: backendData.degree
  }),
  experiences: backendData => backendData.map(mapExperience)
};
