import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('COMMENTS', () => {
    it('get comments',async () => {
        const res = await request.get('/comments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(500);
    });
    it('post comment',async () => {
        const data = {
            postId: 1,
            name: "pudge",
            email: "qwerty@gmail.com",
            body:"zxc"
        }
        const res = await request.post('/comments').send(data);
        expect(res.body.body).toEqual('zxc');
    });
    it('get comment by id',async () => {
        const res = await request.get('/comments/1');
        expect(res.body.id).toEqual(1);
    });
    it('update comment',async () => {
        const data = {
            postId: 322,
            name: "pudge",
            email: "qwerty@gmail.com",
            body:"zxc"
        }
        const res = await request.put('/comments/1').send(data);
        expect(res.body.postId).toEqual(322)
    });
    it('update comment by patch',async () => {
        const data = {
            postId: 322
        }
        const res = await request.patch('/comments/1').send(data);
        expect(res.body.postId).toEqual(322);
        expect(res.body.id).toEqual(1)
    });
    it('delete comment',async () => {
        const res = await request.delete('/comments/1')
        expect(res.body).toEqual({})
    });
});