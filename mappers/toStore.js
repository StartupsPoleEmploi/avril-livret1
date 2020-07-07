import get from 'lodash.get';
import { generateUuid } from 'avril/js/utils/string';
import { parseISODate } from 'avril/js/utils/time';

const mapClassification = data => data.label;

const mapExperience = experience => {
  const map = {
    uuid: experience.uuid || generateUuid(),
    isCurrent: false,
    role: experience.title,
    companyName: experience.company_name,
    companyAddress: Object.assign({}, experience.full_address, {
      postalCode: get(experience, 'full_address.postal_code', null)
    }),
    contractType: experience.employment_type,
    category: experience.job_industry,
    activities: experience.skills.map(mapClassification),
    periods: experience.periods.map(period => ({
      uuid: period.uuid || uuid(),
      start: parseISODate(period.start_date),
      end: parseISODate(period.end_date),
      weekHours: period.week_hours_duration,
      totalHours: period.total_hours,
    }))
  };
  return map;
};

export const backendToStore = {
  index: backendData => ({
    isReadOnly: backendData.isReadOnly,
    hash: backendData.hash,
    delegateHash: backendData.delegateHash,
    certificationLabel: backendData.certification_name,
    certifierLabel: backendData.certifier_name,
    completedAt: parseISODate(backendData.completed_at),
  }),
  identity: backendData => ({
    ...backendData,
    firstNames: backendData.firstName,
    // lastName: backendData.last_name,
    // usageName: backendData.usage_name,
    // email: backendData.email,
    sex: backendData.gender,
    cellPhoneNumber: backendData.mobilePhone,
    homePhoneNumber: backendData.homePhone,
    birthday: parseISODate(backendData.birthday),
    // isHandicapped: backendData.is_handicapped,
    currentSituation: {
      ...get(backendData, 'currentSituation'),
      // status: get(backendData, "currentSituation.status", null),
    //   employmentType: get(backendData, "current_situation.employment_type", null),
    //   registerToPoleEmploi: get(backendData, "current_situation.register_to_pole_emploi", null),
      registerToPoleEmploiSince: parseISODate(
        get(backendData, 'currentSituation.registerToPoleEmploiSince', null)
      ),
      // compensationType: get(backendData, "current_situation.compensation_type")
    },
    // birthPlace: {
    //   city: get(backendData, "birth_place.city", null),
    //   county: get(backendData, "birth_place.county", null),
    //   country: get(backendData, "birth_place.country", null),
    //   lat: get(backendData, "birth_place.lat", null),
    //   lng: get(backendData, "birth_place.lng", null),
    // },
    // nationality: Object.assign({}, backendData.nationality),
    address: backendData.fullAddress,
    // address: {
    //   street: get(backendData, "full_address.street", null),
    //   city: get(backendData, "full_address.city", null),
    //   postalCode: get(backendData, "full_address.postal_code", null),
    //   country: get(backendData, "full_address.country", null),
    //   lat: get(backendData, "full_address.lat", null),
    //   lng: get(backendData, "full_address.lng", null)
    // }
  }),
  education: backendData => ({
    relatedDegrees: get(backendData, 'diplomas', []).map(mapClassification),
    trainings: get(backendData, 'courses', []).map(mapClassification),
    latestCourseLevel: backendData.grade,
    latestDegree: backendData.degree
  }),
  experiences: backendData => backendData.map(mapExperience)
};
