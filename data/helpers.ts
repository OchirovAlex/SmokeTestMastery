import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user, user1, user2, user3, user4, user5 } from "./user";

export async function deleteFunction(cookie: [x: string]): Promise<any> {
  return await request.delete("/users/deleteMe").set("Cookie", cookie);
}

export async function login(user: {
  email: string;
  password: string;
}): Promise<any> {
  return await request
    .post("/users/login")
    .send({ email: user.email, password: user.password });
}

export async function signUp(user: string | object | undefined): Promise<any> {
  return await request.post("/users/signup").send(user);
}
