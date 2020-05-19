import get from 'lodash.get';
import { formatISODate } from 'avril/js/utils/time';

const mapExperience = experience => ({
  uuid: experience.uuid,
  title: experience.role,
  company_name: experience.companyName,
  full_address: Object.assign({}, experience.companyAddress, {
    postal_code: get(experience, 'companyAddress.postalCode')
  }),
  job_industry: experience.category,
  employment_type: experience.contractType,
  skills: experience.activities.map(mapClassification),
  periods: experience.periods.map(period => ({
    start_date: formatISODate(period.start),
    end_date: formatISODate(period.end),
    week_hours_duration: period.weekHours,
    total_hours: period.totalHours,

  }))
});

const mapClassification = classification => ({
  label: classification
});

export const storeToBackend = {
  index: state => ({
    completed_at: formatISODate(state.completedAt, 'complete'),
    certification_name: state.certificationLabel,
    certifier_name: state.certifierLabel
  }),
  identity: state => ({}),
  education: state => ({
    grade: state.latestCourseLevel,
    degree: state.latestDegree,
    diplomas: state.relatedDegrees.map(mapClassification),
    courses: state.trainings.map(mapClassification)
  }),
  experiences: state => state.map(mapExperience)
};
