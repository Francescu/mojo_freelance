import getSkillsExperiences from "../../../../src/freelancers/utils/get-skills-experiences";

const experiences = [
  {
    id: 4,
    startDate: "2016-01-01T00:00:00+01:00",
    endDate: "2018-05-01T00:00:00+01:00",
    skills: [
      {
        id: 241,
        name: "React",
      },
      {
        id: 270,
        name: "Node.js",
      },
      {
        id: 370,
        name: "Javascript",
      },
    ],
  },
  {
    id: 54,
    startDate: "2014-01-01T00:00:00+01:00",
    endDate: "2016-09-01T00:00:00+01:00",
    skills: [
      {
        id: 470,
        name: "MySQL",
      },
      {
        id: 400,
        name: "Java",
      },
      {
        id: 370,
        name: "Javascript",
      },
    ],
  },
  {
    id: 80,
    startDate: "2013-05-01T00:00:00+01:00",
    endDate: "2014-07-01T00:00:00+01:00",
    skills: [
      {
        id: 370,
        name: "Javascript",
      },
      {
        id: 400,
        name: "Java",
      },
    ],
  },
];

describe("getSkillsExperiences", () => {
  describe("error handling", () => {
    test("It should throw an error if there is no experiences in the array", () => {
      try {
        getSkillsExperiences();
      } catch (error) {
        expect(error.message).toEqual("No experiences to process.");
      }
    });
  });

  test("It should return skills experiences", () => {
    const skillsExperiences = getSkillsExperiences(experiences);

    expect(skillsExperiences).toMatchSnapshot();
  });
});
