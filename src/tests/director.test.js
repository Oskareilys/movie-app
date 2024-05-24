const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async() => {
    
    const director = {
        firstName:"Christopher Edward",
        lastName: "Nolan",
        nationality:"Estadounidense",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Christopher_Nolan_Cannes_2018.jpg/330px-Christopher_Nolan_Cannes_2018.jpg",
        birthday:"1970-07-30"
    } 
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
} );

test('PUT /directors/:id debe actualizar un director', async() => {

    const director = {
        firstName:"Christopher"
    } 
    const res = await request(app).put('/directors/'+id).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);

} );

test('DELETE /directors/:id debe eliminar un director', async() => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);

} );