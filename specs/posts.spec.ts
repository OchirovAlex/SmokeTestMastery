import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('POSTS', () => {
    it('get request',async () => {
        const res = await request.get('/posts');
        console.log(res.statusCode);
        console.log(res.body[0].id);
        expect(res.body[0].id).toEqual(1)
        expect(res.statusCode).toEqual(200)
    });
    it('post request',async () => {
        const data = {
            title: "My first post request",
            body: "zxc",
            userId: 322
        }
        const res = await request.post("/posts").send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("My first post request")
    });
    it('get post by id',async () => {
        const res = await request.get("/posts/1");
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toEqual(1)
    });
    it('put request',async () => {
        const data = {
            title:"qwerty",
            body:"zxc",
            userId:322
        }
        const res = await request.put("/posts/1").send(data)
        console.log(res.body)
        expect(res.body.userId).toEqual(322)
    });
    it('patch request',async () => {
        const data = {
            title:"zxc"
        }
        const res = await request.patch('/posts/1').send(data);
        console.log(res.body);
        expect(res.body.title).toEqual('zxc')
    });
    it('delete request',async () => {
        const res = await request.delete('/posts/1')
        console.log(res.body);
    });
    it('patch v2',async () => {
        const data = {
            title:"zxc"
        }
        const getRes = await request.get('posts/1');
        const beforeTitle = getRes.body.title;
        await request
        .patch('/posts/1')
        .send(data)
        .then(response=>{
            console.log(response.body, 'BODY')
            expect(response.statusCode).toEqual(200)
            expect(response.body.title).toBe(data.title)
            expect(response.body.title).not.toBe(beforeTitle)
        })
    });
    it('patch v3', (done) => {
        const data = {
            title:"zxc"
        }
        // const getRes = await request.get('posts/1');
        // const beforeTitle = getRes.body.title;
        request
        .patch('/posts/1')
        .send(data)
        .expect(200)
        .end((err,res)=>{
            if(err) return done()
            console.log(res.body, 'BODY')
            expect(res.body.title).toBe(data.title)
           // expect(res.body.title).not.toBe(beforeTitle)
            done()
        }) 
    });
    it('patch v3', (done) => {
        const data = {
            title:"zxc"
        }
        request
        .patch('/posts/1')
        .send(data)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err)
            console.log(res.body, 'BODY')
            expect(res.body.title).toBe(data.title)
           // expect(res.body.title).not.toBe(beforeTitle)
            done()
        }) 
    });
});