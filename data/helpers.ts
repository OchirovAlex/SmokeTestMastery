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


const randomTourName = (charCount: number): string => {
  const text = faker.lorem.text();
  let limitedText = text.slice(0, charCount);
  limitedText = limitedText.slice(0, limitedText.lastIndexOf(' '));
  return limitedText;
};

user.aggregate([{ $sample: { size: 1 } }])
  .then(users => {
    const randomUser = users[0];
    
    const guide = new Guide({
      guides: [randomUser._id]
    });
    
    return guide.save();
  })

export const randomTour:Tour = {
  name: randomTourName(40),
  duration: faker.number.int({min:10, max:40}),
  description: faker.lorem.words(5),
  maxGroupSize: faker.number.int({min: 10, max: 30}),
  summary: faker.lorem.words(10),
  difficulty: ,
  price: faker.number.int(),
  rating: faker.number.float({min:1.0, max:5.0}),
  imageCover: `tour-${faker.number.int({min:1,max:9})}-cover.jpg`,
  ratingsAverage: faker.number.float({min:1.0, max:5.0}),
  guides: object,
  startDates: [x:string],
  location: {
    latitude: number,
    longitude: number,
    description: string,
    address: string,
  },
  startLocation: {
    type: string,
    coordinates: number,
  }
}


export function upload(files: string[]): Promise<any> {
  const req = requestSdet.post("/upload/multiple")

  files.forEach(file => {
    req.attach('multiple',file)
  });
  return req;
}