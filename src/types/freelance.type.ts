import type { Moment } from "moment";

interface Freelance {
  id: string;
  professionalExperiences: Array<ProfessionalExperience>;
}

interface Skill {
  id: number;
  name: string;
}

interface ProfessionalExperience {
  startDate: string;
  endDate: string;
  skills: Array<Skill>;
}

interface ComputedFreelance {
  id: string;
  computedSkills: Array<ComputedSkill>;
}

interface ComputedSkill {
  id: number;
  name: string;
  durationInMonths: number;
}

interface SkillExperience {
  id: number;
  dates: Array<Duration>;
}

interface Duration {
  startDate: Moment;
  endDate: Moment;
}

export type {
  Freelance,
  Skill,
  ProfessionalExperience,
  ComputedFreelance,
  ComputedSkill,
  SkillExperience,
};
