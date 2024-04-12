import * as supertest from 'supertest';
import {user,user1,user2,user3,user4,user5} from '../../../data/user'
const request = supertest('localhost:8001/api/v1');
import {deleteFunction} from "../../../data/helpers"

describe('USER SIGN UP', () => {
    describe('POSITIVE', () => {
        it('login user',async () => {
            const res = await request
            .post('/users/signup')
            .send(user)
            .expect(201);

            const resLogin = await request
            .post('/users/login')
            .send({email:user.email,password:user.password})
            .expect(200)
            expect(resLogin.statusCode).toBe(200)
            expect(resLogin.header['content-type']).toBe('application/json; charset=utf-8')
            expect(typeof resLogin).toBe('object')
        });
        it('login user v2',async () => {
            await request
            .post('/users/signup')
            .send(user1)
            .expect(201)

            await request
            .post('/users/login')
            .send({email:user1.email,password:user1.password})
            .then(response=>{
                expect(response.statusCode).toBe(200)
                expect(response.status).toBe(200)
                expect(typeof response).toBe('object')
                expect(response.header['content-type']).toBe('application/json; charset=utf-8')
            })
        });
        it('login user v3', (done) => {
            request
            .post('/users/signup')
            .send(user2)
            .expect(201)
            .then(() => {
                request
                .post('/users/login')
                .send({email:user2.email,password:user2.password})
                .end((err,res)=>{
                    if(err) return done(err)
                    expect(res.status).toBe(200)
                    expect(res.statusCode).toBe(200)
                    expect(res.header['content-type']).toBe('application/json; charset=utf-8')
                    expect(typeof res).toBe('object')
                    console.log(res.body,777777777777777777777777777777777777777)
                    done()
                })
            })
            .catch(err => done(err));
        })
    });
    describe('NEGATIVE', () => {
        it('login user with invalid credentials',async () => {
            await request
            .post('/users/signup')
            .send(user3)
            .expect(201)

            const res = await request
            .post('/users/login')
            .send({email:user3.email})
            .expect(400)
            expect(res.body.status).toBe('fail')
            expect(res.body.message).toBe('Please provide email and password!')
        });
        it('login user with invalid credentials v2',async () => {
            await request
            .post('/users/signup')
            .send(user4)
            .expect(201)

            await request
            .post('/users/login')
            .send({password:user4.password})
            .expect(400)
            .then(res=>{
                expect(res.body.status).toBe('fail');
                expect(res.body.message).toBe('Please provide email and password!')
            })
        });
        it('login user with invalid credentials v3', (done) => {
            request 
            .post('/users/signup')
            .send(user5)
            .expect(201);

            request 
            .post('/users/login')
            .send({password:user5.password})
            .expect(400)
            .end((err,res)=>{
                if(err) return done(err);
                expect(res.body.status).toBe('fail')
                expect(res.body.message).toBe('Please provide email and password!')
                done()
            })
        });
    });
});