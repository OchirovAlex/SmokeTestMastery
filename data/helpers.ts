import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user, user1, user2, user3, user4, user5 } from "./user";
import {Tour} from "./interface";
import { faker } from '@faker-js/faker';
const requestSdet = supertest("https://practice-react.sdetunicorns.com/api/test")

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


// export const randomTour:Tour = {
//   name: faker.lorem.words(3),
//   duration: faker.number.int({min:10, max:40}),
//   description: faker.lorem.words(5),
//   maxGroupSize: number,
//   summary: string,
//   difficulty: string,
//   price: number,
//   rating: number,
//   imageCover: string,
//   ratingsAverage: number,
//   guides: object,
//   startDates: [x:string],
//   location: {
//     latitude: number,
//     longitude: number,
//     description: string,
//     address: string,
//   },
//   startLocation: {
//     type: string,
//     coordinates: number,
//   }
// }


export function upload(files: string[]): Promise<any> {
  const req = requestSdet.post("/upload/multiple")

  files.forEach(file => {
    req.attach('multiple',file)
  });
  return req;
}