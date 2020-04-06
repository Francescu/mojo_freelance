import server from "../src/server";

import request from "supertest";

console.error = jest.fn();

describe("Test Freelancer API", () => {
  test("Expect 404 not found on invalid route", async () => {
    const result = await request(server).get("/");
    expect(result.body).toEqual({});
    expect(result.statusCode).toEqual(404);
  });

  describe("GET /freelancer/:id/skills", () => {
    test("Expect to fail if id is invalid", async () => {
      const result = await request(server).get("/freelancer/invalidID/skills");
      expect(result.text).toEqual("Server error.");
      expect(result.statusCode).toEqual(500);
    });

    test("Expect to return valid skill experience duration on success", async () => {
      const result = await request(server).get("/freelancer/42/skills");
      expect(result.statusCode).toEqual(200);
      expect(result.body).toMatchSnapshot();
    });
  });
});
