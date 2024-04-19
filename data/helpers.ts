import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user, user1, user2, user3, user4, user5 } from "./user";
import {Tour} from "./interface";
import { faker } from '@faker-js/faker';
const requestSdet = supertest("https://practice-react.sdetunicorns.com/api/test")
const mongoose = require('mongoose');


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


const User = require('../../tourProjectNode/models/userModel.js');

const uri = 'mongodb+srv://sanchous:rV5a4uYtAgF481vC@cluster0.k8kh5hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)

async function getRandomUser() {
  try {
    const users = await User.aggregate([{ $sample: { size: 1 } }]);
    
    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    const randomUser = users[0];
    const userData = {
      _id: randomUser._id,
    };
    
    return userData._id;
  } catch (error) {
    throw new Error(`Error getting random user: ${error.message}`);
  }
}
function randomDifficulty(){
  const diff = ['Easy', 'Medium', 'Hard']
  return diff[faker.number.int({min:0,max:2})]
}
const randomDate = faker.date.past();
const dateWithoutTime = randomDate.toISOString().split('T')[0];

const [date] = [dateWithoutTime];

export const randomTour:Tour = {
  name: randomTourName(40),
  duration: faker.number.int({min:10, max:40}),
  description: faker.lorem.words(5),
  maxGroupSize: faker.number.int({min: 10, max: 30}),
  summary: faker.lorem.words(10),
  difficulty: randomDifficulty(),
  price: faker.number.int(),
  rating: faker.number.float({min:1.0, max:5.0}),
  imageCover: `tour-${faker.number.int({min:1,max:9})}-cover.jpg`,
  ratingsAverage: faker.number.float({min:1.0, max:5.0}),
  guides: getRandomUser(),
  startDates: [date],
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    description: faker.lorem.sentence(),
    address: faker.location.streetAddress({ useFullAddress: true }),
  },
  startLocation: {
    type: 'Point',
    coordinates: [
      faker.location.longitude(),
      faker.location.latitude()
    ],
  }
}


export function upload(files: string[]): Promise<any> {
  const req = requestSdet.post("/upload/multiple")

  files.forEach(file => {
    req.attach('multiple',file)
  });
  return req;
}