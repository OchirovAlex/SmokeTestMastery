import * as supertest from 'supertest';
import {user} from '../../../data/user'
import {User} from '../../../data/interface'
const request = supertest('localhost:8001/api/v1');

describe('USER SIGN UP', () => {
    describe.only('POSITIVE TESTING', () => {
        it('create new user',async () => {
            const data:User = {
                email: "qw@gmail.com",
                password: "pass1234",
                passwordConfirm:"pass1234",
                name: "Noah"
            }
            const res = await request
                .post('/users/signup')
                .send(data)
                .expect(201);
            console.log(res.body)
            expect(res.body.data.user.name).toBe('Noah');
            expect(res.body.data.user.email).toBe(data.email);
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe('string')
        });
        it('create new user with imported data',async () => {
            const res = await request
                .post('/users/signup')
                .send(user)
                .expect(201);
            console.log(res.body)
            expect(res.body.data.user.name).toBe(user.name);
            expect(res.body.data.user.email).toBe(user.email);
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe('string')
        });
        it('create new user v2', () => {
            
        });
    });
    describe('NEGATIVE TESTING', () => {
        it('should not create new user with the same email',async () => {
            await request
                .post('/users/signup')
                .send(user)
                .expect(201);
            await request
                .post('/users/signup')
                .send(user)
                .then(resp=>{
                    console.log(resp.body,'===============================');
                    expect(resp.body.message).toBe(`E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"${user.email}\" }`)
                });
        });
        it('should not create new user without the name',async () => {
            const data ={
                email: user.email,
                password: user.password,
                passwordConfirm: user.passwordConfirm
            }
            await request
                .post('/users/signup')
                .send(data)
                .then(res=>{
                    console.log(res.body.message)
                    expect(res.body.message).toBe('User validation failed: name: Please tell us your name!')
                })
        });
        it('should not create new user without the email',async () => {
            const data ={
                name: user.name,
                password: user.password,
                passwordConfirm: user.passwordConfirm
            }
            await request
                .post('/users/signup')
                .send(data)
                .then(res=>{
                    console.log(res.body.message)
                    expect(res.body.message).toBe('User validation failed: email: Please provide your email')
                })
        });
        it('should not create new user without the password',async () => {
            const data ={
                name: user.name,
                email: user.email,
                passwordConfirm: user.passwordConfirm
            }
            await request
                .post('/users/signup')
                .send(data)
                .then(res=>{
                    console.log(res.body.message)
                    expect(res.body.message).toBe('User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!')
                })
        });
        it('should not create new user without the password confirmation',async () => {
            const data ={
                name: user.name,
                email: user.email,
                password: user.password
            }
            await request
                .post('/users/signup')
                .send(data)
                .then(res=>{
                    console.log(res.body.message)
                    expect(res.body.message).toBe('User validation failed: passwordConfirm: Please confirm your password')
                })
        });
    });
});