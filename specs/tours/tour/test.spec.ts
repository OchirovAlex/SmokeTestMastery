import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import {Tour} from "../../../data/interface";
const url = 'mongodb+srv://sanchous:rV5a4uYtAgF481vC@cluster0.k8kh5hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
import { getRandomUserId, randomTour } from "../../../data/helpers";


describe('qwe', () => {
    it('rty',async () => {
        console.log(await randomTour())
    });
});
