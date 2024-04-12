import * as supertest from "supertest";
import { user, user1, user2, user3, user4, user5 } from "../../../data/user";
const request = supertest("localhost:8001/api/v1");
import { deleteFunction, login, signUp } from "../../../data/helpers";

describe("DELETE USER", () => {
  let cookie: [x: string];
  describe("POSITIVE", () => {
    it("delete user", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);

      const resLogin = await request
        .post("/users/login")
        .send({ email: user.email, password: user.password })
        .expect(200);
      expect(resLogin.statusCode).toBe(200);
      expect(resLogin.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(typeof resLogin).toBe("object");

      await request
        .delete("/users/deleteMe")
        .set("Cookie", resLogin.headers["set-cookie"])
        .expect(204);

      // await deleteFunction(resLogin).then(el=>{
      //     console.log(el,"el");
      // })

      await request
        .post("/users/login")
        .send({ email: user.email, password: user.password })
        .then((res) => {
          expect(res.statusCode).toBe(401);
        });
    });

    it("request delete with helper", async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201);
      });
      cookie = await login(user).then((res) => {
        expect(res.statusCode).toBe(200);
        return res.header["set-cookie"];
      });
      await deleteFunction(cookie).then((res) => {
        expect(res.statusCode).toBe(204);
      });
      await login(user).then((res) => {
        expect(res.statusCode).toBe(401);
      });
    });
  });
  describe("NEGATIVE", () => {
    let cookie: [x: string];
    beforeEach(async () => {
      await signUp(user).then((res) => {
        expect(res.statusCode).toBe(201);
        cookie = res.header["set-cookie"];
      });
    });
    afterEach(async () => {
      await deleteFunction(cookie).then((el) => {
        expect(el.statusCode).toBe(204);
        expect(el.body).toEqual({});
      });
    });
    it("user cannot login with invalid credentials", async () => {
      await login({
        email: user.email + "1",
        password: user.password + "1",
      }).then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toEqual("Incorrect email or password");
      });
    });
    it("user cannot login with invalid credentials v2", async () => {
      const res = await login({
        email: user.email,
        password: user.password,
      });
      expect(res.body.statusCode).toBe(200);
      expect(res.body.message).toEqual("Incorrect email or password");
    });
    it("user cannot login with invalid credentials v3", (done) => {
      login({
        email: user.email,
        password: user.password,
      }).then((response) => {
        response.end((err, res) => {
          if (err) return done(err);
          expect(response.body.message).toEqual("Incorrect email or password");
          done();
        });
      });
    });
  });
});
