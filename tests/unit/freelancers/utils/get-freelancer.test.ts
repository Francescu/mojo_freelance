import getFreelancer from "../../../../src/freelancers/utils/get-freelancer";

describe("getFreelancer", () => {
  test("It should return a freelance parsed object on success", () => {
    const freelance = getFreelancer(42);

    expect(freelance.id).toBe(42);
  });

  test("It should throw an error on failure", () => {
    const invalidId = "some id";
    try {
      getFreelancer(Number(invalidId));
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });
});
