import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user, user1, user2, user3, user4, user5 } from "./user";
import { Tour } from "./interface";
import { faker } from "@faker-js/faker";
const requestSdet = supertest(
  "https://practice-react.sdetunicorns.com/api/test"
);
import { MongoClient, ObjectId } from "mongodb";

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
  limitedText = limitedText.slice(0, limitedText.lastIndexOf(" "));
  return limitedText;
};

const uri =
  "mongodb+srv://sanchous:rV5a4uYtAgF481vC@cluster0.k8kh5hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function getRandomUserId() {
  let connection;
  let db;
  try {
    connection = await MongoClient.connect(uri);

    db = connection.db();

    const collection = db.collection("users");

    const count = await collection.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomUser = await collection.findOne({}, { skip: randomIndex });

    return [randomUser._id];
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

function randomDifficulty() {
  const diff = ["Easy", "Medium", "Hard"];
  return diff[faker.number.int({ min: 0, max: 2 })];
}
const randomDate = faker.date.past();
const dateWithoutTime = randomDate.toISOString().split("T")[0];

const [date] = [dateWithoutTime];

export async function randomTour() {
  return {
    name: randomTourName(40),
    duration: faker.number.int({ min: 10, max: 40 }),
    description: faker.lorem.words(5),
    maxGroupSize: faker.number.int({ min: 10, max: 30 }),
    summary: faker.lorem.words(10),
    difficulty: randomDifficulty(),
    price: faker.number.int(),
    rating: faker.number.float({ min: 1.0, max: 5.0 }),
    imageCover: `tour-${faker.number.int({ min: 1, max: 9 })}-cover.jpg`,
    ratingsAverage: faker.number.float({ min: 1.0, max: 5.0 }),
    guides: await getRandomUserId(),
    startDates: [date],
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      description: faker.lorem.sentence(),
      address: faker.location.streetAddress({ useFullAddress: true }),
    },
    startLocation: {
      type: "Point",
      coordinates: [faker.location.longitude(), faker.location.latitude()],
    },
  };
}
export function upload(files: string[]): Promise<any> {
  const req = requestSdet.post("/upload/multiple");

  files.forEach((file) => {
    req.attach("multiple", file);
  });
  return req;
}