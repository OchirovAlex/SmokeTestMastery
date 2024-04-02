import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('ALBUMS', () => {
    it('get request',async () => {
        const res = await request.get('/albums');
        console.log(res.statusCode,'statusCode GET');
        console.log(res.body[0].title,'title GET');
        expect(res.body[0].title).toEqual('quidem molestiae enim')
        expect(res.statusCode).toEqual(200)
    });
    it('post request',async () => {
        const data = {
            title: "album",
            userId: 322
        }
        const res = await request.post("/albums").send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("album")
    });
    it('get post by id',async () => {
        const res = await request.get("/albums/1");
        console.log(res.body,'body by id')
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toEqual(1)
    });
    it('update post',async () => {
        const data = {
            title:"qwerty",
            userId:322
        }
        const res = await request.put("/albums/1").send(data)
        console.log(res.body)
        expect(res.body.userId).toEqual(322)
    });
    it('update post by patch',async () => {
        const data = {
            title:"zxc"
        }
        const res = await request.patch('/albums/1').send(data);
        console.log(res.body);
        expect(res.body.title).toEqual('zxc')
    });
    it('delete post',async () => {
        const res = await request.delete('/albums/1')
        console.log(res.body);
    });
});