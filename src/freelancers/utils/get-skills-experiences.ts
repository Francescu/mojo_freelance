import type {
  ProfessionalExperience,
  Skill,
  SkillExperience,
} from "../../types/index.type";

import moment from "moment";

/**
 * Get an object which list for every skill all the experiences.
 * @param {Array<ProfessionalExperience>} experiences The list of all experiences of a freelancer.
 */
const getSkillsExperiences = (
  experiences: Array<ProfessionalExperience> = []
): Record<string, SkillExperience> => {
  /**
   * If no experiences at all, we assume there is an error in the input and we throw.
   */
  if (experiences.length === 0) {
    throw new Error("No experiences to process.");
  }

  const skillsExperiences: Record<string, SkillExperience> = {};

  experiences.forEach(
    ({ startDate, endDate, skills }: ProfessionalExperience) => {
      const start = moment.parseZone(startDate);
      const end = moment.parseZone(endDate);

      skills.forEach(({ id, name }: Skill) => {
        if (skillsExperiences[name]) {
          skillsExperiences[name].dates.push({
            startDate: start,
            endDate: end,
          });
        } else {
          skillsExperiences[name] = {
            id,
            dates: [{ startDate: start, endDate: end }],
          };
        }
      });
    }
  );

  return skillsExperiences;
};

export default getSkillsExperiences;
