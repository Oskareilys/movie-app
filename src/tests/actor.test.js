const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async() => {
    
    const actor = {
        firstName:"Leonardo",
        lastName: "DiCaprio",
        nationality:"Estadounidense",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Leonardo_DiCaprio_in_2023_%28cropped%29.png/330px-Leonardo_DiCaprio_in_2023_%28cropped%29.png",
        birthday:"1974-11-11"
    } 
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
} );

test('PUT /actors/:id debe actualizar un actor', async() => {

    const actor = {
        lastName: "DICaprio",
        nationality:"EstadoUnidense",
    } 
    const res = await request(app).put('/actors/'+id).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(actor.lastName);

} );

test('DELETE /actors/:id debe eliminar un actor', async() => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);

} );
