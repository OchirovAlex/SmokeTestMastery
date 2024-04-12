import * as supertest from 'supertest';
const request = supertest("https://practice-react.sdetunicorns.com/api/test")
import {upload} from "../../data/helpers";


describe('UPLOAD', () => {
    it('upload single document',async () => {
        await request
        .post('/upload/single')
        .attach('single', 'data/image/1.jpg')
        .then(res=>{
            expect(res.body.filename).toBe('1.jpg');
            console.log(res.body);
        })
    });

    it('upload multiple documents',async () => {
        const files:string[] = ['data/image/1.jpg', 'data/image/2.jpg']
        const res = await upload(files);
        console.log(res.body);
        expect(res.status).toBe(200);
    });

    it('upload multiple documents v2', () => {
        const files:string[] = ['data/image/1.jpg', 'data/image/2.jpg'];
        const req = request.post('/upload/multiple')

        for(const file of files){
            req.attach('multiple',file)
        }
        return new Promise((resolve,reject)=>{
            req.end((err,res)=>{
                if (err){
                    console.error(err)
                    reject(err)
                }else{
                    console.log('Upload succesful', res.body)
                    expect(res.status).toBe(200)
                    resolve(res)
                }
            })
        })
    });
});