const {MongoClient, ObjectId} = require('mongodb');
import {getUser} from "../data/user";
import {signUp} from "../data/helpers";

const DATABASE_URL = "mongodb+srv://sanchous:rV5a4uYtAgF481vC@cluster0.k8kh5hx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('verify that mongodb file was written to db', async () => {
    const users = db.collection("users")
    const user = await users.findOne({name:"Gerald53"})
    console.log(user, 'user');
    expect(user.name).toEqual('Gerald53');
  });
  it.only('verify that user was created at mongoDB', async () => {
    const userImport = getUser()
    console.log(userImport, 'userImport');
    const res = await signUp(userImport);
    console.log(res.body);
    const users = db.collection('users');
    const userData = await users.findOne({name:userImport.name})
    if(!userData){
        throw new Error("Usernot found");
    }
    expect(userData.name).toEqual(userImport.name);
    expect((userData._id).toString()).toEqual(res.body.data.user._id);
    let deleteData = await users.deleteOne({_id:new ObjectId(userData._id)})
    let findUser = await users.findOne({_id: userData._id})
    console.log(deleteData)
    console.log(findUser)
  });
});