jest.mock("../../../src/freelancers/utils/get-freelancer");
jest.mock("../../../src/freelancers/utils/get-computed-skills");
jest.mock("../../../src/freelancers/utils/get-skills-experiences");

import type { Request, Response } from "express";

import getFreelancer from "../../../src/freelancers/utils/get-freelancer";
import getComputedSkills from "../../../src/freelancers/utils/get-computed-skills";
import getSkillsExperiences from "../../../src/freelancers/utils/get-skills-experiences";

const mockedGetFreelancer = ((getFreelancer as unknown) as jest.Mock).mockImplementation();
const mockedGetComputedSkills = ((getComputedSkills as unknown) as jest.Mock).mockImplementation();
const mockedGetSkillsExperiences = ((getSkillsExperiences as unknown) as jest.Mock).mockImplementation();

import getSkills from "../../../src/freelancers/get-skills";

console.error = jest.fn();

const json = jest.fn(() => res);
const status = jest.fn(() => res);
const send = jest.fn(() => res);

const req = ({ params: { id: "42" } } as any) as Request;
const res = ({
  json,
  status,
  send,
} as any) as Response;

describe("getSkills", () => {
  describe("error handling", () => {
    const someFreelance = { id: "some id", professionalExperiences: [] };
    const someSkillsExperiences = { skill: { id: " some id" } };

    test("It should return an error if freelance couldn't be found.", () => {
      const getFreelancerError = new Error("some error");
      mockedGetFreelancer.mockImplementationOnce(() => {
        throw getFreelancerError;
      });
      const invalidReq = ({ params: {} } as any) as Request;
      getSkills(invalidReq, res);

      expect(mockedGetFreelancer).toHaveBeenCalledTimes(1);
      expect(mockedGetFreelancer).toHaveBeenCalledWith(NaN);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith("Server error.");
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(getFreelancerError);

      expect(mockedGetSkillsExperiences).not.toHaveBeenCalled();
      expect(mockedGetComputedSkills).not.toHaveBeenCalled();
    });

    test("It should return an error if skills experience couldn't be extracted.", () => {
      const getSkillsExperiencesError = new Error("some error");

      mockedGetFreelancer.mockImplementationOnce(() => someFreelance);
      mockedGetSkillsExperiences.mockImplementationOnce(() => {
        throw getSkillsExperiencesError;
      });
      getSkills(req, res);

      expect(mockedGetFreelancer).toHaveBeenCalledTimes(1);
      expect(mockedGetFreelancer).toHaveBeenCalledWith(Number(req.params.id));
      expect(mockedGetSkillsExperiences).toHaveBeenCalledTimes(1);
      expect(mockedGetSkillsExperiences).toHaveBeenCalledWith(
        someFreelance.professionalExperiences
      );

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith("Server error.");
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(getSkillsExperiencesError);

      expect(mockedGetComputedSkills).not.toHaveBeenCalled();
    });

    test("It should return an error if skills coudn't be computed.", () => {
      const getComputedSkillsError = new Error("some error");
      mockedGetFreelancer.mockImplementationOnce(() => someFreelance);
      mockedGetSkillsExperiences.mockImplementationOnce(
        () => someSkillsExperiences
      );
      mockedGetComputedSkills.mockImplementationOnce(() => {
        throw getComputedSkillsError;
      });

      getSkills(req, res);

      expect(mockedGetFreelancer).toHaveBeenCalledTimes(1);
      expect(mockedGetFreelancer).toHaveBeenCalledWith(Number(req.params.id));
      expect(mockedGetSkillsExperiences).toHaveBeenCalledTimes(1);
      expect(mockedGetSkillsExperiences).toHaveBeenCalledWith(
        someFreelance.professionalExperiences
      );
      expect(mockedGetComputedSkills).toHaveBeenCalledTimes(1);
      expect(mockedGetComputedSkills).toHaveBeenCalledWith(
        someSkillsExperiences
      );

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith("Server error.");
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(getComputedSkillsError);
    });
  });

  test("It should return computed freelance when everything is fine with the data", () => {
    const someFreelance = {
      id: "some id",
      professionalExperiences: [
        {
          id: 4,
          startDate: "2016-01-01T00:00:00+01:00",
          endDate: "2018-05-01T00:00:00+01:00",
          skills: [
            {
              id: 370,
              name: "Javascript",
            },
          ],
        },
      ],
    };
    const someSkillsExperiences = {
      Javascript: { id: 370, startDate: "some date", endDate: "some date" },
    };
    const someComputedSkills = [
      { id: 370, name: "Javascript", durationInMonths: 300 },
    ];

    mockedGetFreelancer.mockImplementationOnce(() => someFreelance);
    mockedGetSkillsExperiences.mockImplementationOnce(
      () => someSkillsExperiences
    );
    mockedGetComputedSkills.mockImplementationOnce(() => someComputedSkills);

    getSkills(req, res);

    expect(mockedGetFreelancer).toHaveBeenCalledTimes(1);
    expect(mockedGetFreelancer).toHaveBeenCalledWith(Number(req.params.id));
    expect(mockedGetSkillsExperiences).toHaveBeenCalledTimes(1);
    expect(mockedGetSkillsExperiences).toHaveBeenCalledWith(
      someFreelance.professionalExperiences
    );
    expect(mockedGetComputedSkills).toHaveBeenCalledTimes(1);
    expect(mockedGetComputedSkills).toHaveBeenCalledWith(someSkillsExperiences);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      freelance: { id: someFreelance.id, computedSkills: someComputedSkills },
    });
    expect(console.error).not.toHaveBeenCalled();
  });
});
