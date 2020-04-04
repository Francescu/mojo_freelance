import type { ComputedSkill, SkillExperience } from "../../types/index.type";

import { forEach, sum } from "lodash";

/**
 * Get the computed skill (id, name and durationsInMonth) based on a list of skill experience.
 * @param {Record<string, SkillExperience>} experiences The list of all skill experience
 */
const getComputedSkills = (
  experiences: Record<string, SkillExperience>
): Array<ComputedSkill> => {
  const computedSkills: Array<ComputedSkill> = [];

  forEach(experiences, ({ id, dates }: SkillExperience, skillName: string) => {
    let duration: number = 0;

    if (dates.length === 1) {
      duration = dates[0].endDate.diff(dates[0].startDate, "months");
    } else {
      /**
       * We start by sorting the array of Duration.
       */
      dates.sort((a, b) => a.startDate.diff(b.startDate));

      /**
       * The deltas between all duration if any.
       */
      const deltas: Array<number> = [];
      /**
       * The durations of all skill experience.
       */
      const durations: Array<number> = dates.map((d) =>
        d.endDate.diff(d.startDate, "months")
      );

      for (let i = 0; i + 1 <= dates.length - 1; i++) {
        const { endDate: endDateA } = dates[i];
        const { startDate: startDateB } = dates[i + 1];

        if (endDateA.isAfter(startDateB)) {
          deltas.push(endDateA.diff(startDateB, "months"));
        }
      }

      duration = sum(durations) - sum(deltas);
    }

    computedSkills.push({ id, name: skillName, durationInMonths: duration });
  });

  return computedSkills;
};

export default getComputedSkills;
