import moment from "moment";
import getComputedSkills from "../../../../src/freelancers/utils/get-computed-skills";

const skillsExperiences = {
  Java: {
    dates: [
      {
        endDate: moment.parseZone("2016-09-01T00:00:00+01:00"),
        startDate: moment.parseZone("2014-01-01T00:00:00+01:00"),
      },
      {
        endDate: moment.parseZone("2014-07-01T00:00:00+01:00"),
        startDate: moment.parseZone("2013-05-01T00:00:00+01:00"),
      },
    ],
    id: 400,
  },
};

describe("getComputedSkills", () => {
  test("It should return computed skills", () => {
    const result = getComputedSkills(skillsExperiences);

    expect(result).toMatchSnapshot();
  });
});
