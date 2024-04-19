import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import {Tour} from "../../../data/interface";
const mongoose = require('mongoose');
const User = require('../../../../tourProjectNode/models/userModel.js');
const url = 'mongodb+srv://sanchous:rV5a4uYtAgF481vC@cluster0.k8kh5hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url)


describe('qwe', () => {
    it('rty',async () => {
        await mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
          });
        // async function getRandomUser() {
        //     try {
        //       const users = await User.aggregate([{ $sample: { size: 1 } }]);
              
        //       if (!users || users.length === 0) {
        //         throw new Error('No users found');
        //       }
          
        //       const randomUser = users[0];
        //       const userData = {
        //         _id: randomUser._id,
        //       };
        //       console.log(userData)
              
        //       return userData._id;
        //     } catch (error) {
        //       throw new Error(`Error getting random user: ${error.message}`);
        //     }
        //   }
          
        //   console.log(getRandomUser())
    });
});
