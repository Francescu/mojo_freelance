import type { Freelance } from "../../types/index.type";

const getFreelancer = (id: number): Freelance => {
  return require(`../data/freelancer_${id}.json`).freelance;
};

export default getFreelancer;
