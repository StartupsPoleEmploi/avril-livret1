import get from "lodash.get";
import { uuid } from "../utils/string";

const mapClassification = data => data.label;

const mapExperience = experience => {
  const map = {
    uuid: experience.uuid || uuid(),
    role: experience.title,
    companyName: experience.company_name,
    companyAddress: {
      street: null,
      city: null,
      postalCode: null,
      country: null,
      lat: null,
      lng: null
    },
    category: experience.job_industry,
    contractType: experience.employment_type,
    activities: experience.skills.map(mapClassification),
    periods: experience.periods.map(period => ({
      start: period.start_date,
      end: period.end_date,
      weekHours: period.week_hours_duration
    }))
  };
  return map;
};

export const backendToStore = {
  index: backendData => ({
    hash: backendData.hash,
    certificationLabel: backendData.certification_label,
    certifierLabel: backendData.certifier_label
  }),
  identity: backendData => ({
    firstNames: backendData.first_name,
    lastName: backendData.last_name,
    email: backendData.email,
    sex: backendData.gender,
    cellPhoneNumber: backendData.mobile_phone,
    birthday: backendData.birthday,
    birthPlace: {
      city: get(backendData, "birth_place.city", {}),
      country: get(backendData, "birth_place.country", {}),
      lat: get(backendData, "birth_place.lat", {}),
      lng: get(backendData, "birth_place.lng", {})
    },
    address: {
      street: get(backendData, "full_address.street", {}),
      city: get(backendData, "full_address.city", {}),
      postalCode: get(backendData, "full_address.postal_code", {}),
      country: get(backendData, "full_address.country", {}),
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
