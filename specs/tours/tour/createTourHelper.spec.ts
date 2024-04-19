import { randomTour } from "../../../data/helpers";
import * as supertest from "supertest";
import { user, user1, user2, user3, user4, user5 } from "../../../data/user";
const request = supertest("localhost:8001/api/v1");
import { deleteFunction, login, signUp } from "../../../data/helpers";

let cookie: [x: string];
describe("TOUR", () => {
  beforeEach(async () => {
    await signUp(user).then((res) => {
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.email).toEqual(user.email);
      cookie = res.header["set-cookie"];
      console.log(cookie);
    });
  });
  describe("POSITIVE", () => {
    it("test",async () => {
      await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(randomTour)
      .expect(201)
      .then(res=>{
        console.log(res.body)
      });
    });
  });
});
