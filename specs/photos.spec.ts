import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('PHOTOS', () => {
    it('get request',async () => {
        const res = await request.get('/photos');
        console.log(res.statusCode);
        console.log(res.body[0].id);
        expect(res.body[0].id).toEqual(1)
        expect(res.statusCode).toEqual(200)
    });
    it('post request',async () => {
        const data = {
            title: "photos post",
            body: "zxc",
            userId: 322
        }
        const res = await request.post("/photos").send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("photos post")
    });
    it('get post by id',async () => {
        const res = await request.get("/photos/1");
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toEqual(1)
    });
    it('update post',async () => {
        const data = {
            title:"qwerty",
            userId:322
        }
        const res = await request.put("/posts/1").send(data)
        console.log(res.body)
        expect(res.body.userId).toEqual(322);
        expect(res.body.url).toEqual(undefined);
    });
    it('update post by patch',async () => {
        const data = {
            title:"zxc"
        }
        const res = await request.patch('/photos/1').send(data);
        console.log(res.body);
        expect(res.body.title).toEqual('zxc')
    });
    it('delete post',async () => {
        const res = await request.delete('/photos/1')
        console.log(res.body);
    });
});