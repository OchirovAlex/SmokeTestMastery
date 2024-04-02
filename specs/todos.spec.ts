import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('TODOS', () => {
    it('get request',async () => {
        const res = await request.get('/todos');
        expect(res.body[0].completed).toEqual(false)
        expect(res.statusCode).toEqual(200)
    });
    it('post request',async () => {
        const data = {
            title: "todos",
            userId: 322
        }
        const res = await request.post("/todos").send(data);
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual("todos")
    });
    it('get post by id',async () => {
        const res = await request.get("/todos/1");
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.id).toEqual(1)
    });
    it('update post',async () => {
        const data = {
            title:"qwerty",
            userId:322
        }
        const res = await request.put("/todos/1").send(data)
        console.log(res.body)
        expect(res.body.userId).toEqual(322)
    });
    it('update post by patch',async () => {
        const data = {
            title:"zxc"
        }
        const res = await request.patch('/todos/1').send(data);
        console.log(res.body);
        expect(res.body.title).toEqual('zxc')
    });
    it('delete post',async () => {
        const res = await request.delete('/todos/1')
        console.log(res.body);
    });
});