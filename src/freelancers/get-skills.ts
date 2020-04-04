import type { Request, Response } from "express";

import type {
  Freelance,
  ComputedFreelance,
  SkillExperience,
  ComputedSkill,
} from "../types/index.type";

import getFreelancer from "./utils/get-freelancer";
import getComputedSkills from "./utils/get-computed-skills";
import getSkillsExperiences from "./utils/get-skills-experiences";

/**
 * HTTP GET ENDPOINT
 * Return list of skills with month duration for a specified freelance.
 * @param {Request}   req             The request object
 * @param {String}    req.params.id   The id of the freelance
 * @param {Response}  res             The response object
 */
const getSkills = (req: Request, res: Response) => {
  const { params: { id } = {} } = req;
  try {
    const freelance: Freelance = getFreelancer(Number(id));

    if (!freelance) {
      res.status(500).send("Server Error.");
    }

    const skillsExperiences: Record<
      string,
      SkillExperience
    > = getSkillsExperiences(freelance.professionalExperiences);

    const computedSkills: Array<ComputedSkill> = getComputedSkills(
      skillsExperiences
    );

    const computedFreelance: ComputedFreelance = {
      id: freelance.id,
      computedSkills,
    };

    res.status(200).json({ freelance: computedFreelance });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

export default getSkills;
