const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('GET /movies debe traer todas las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una película', async() => {
    
    const movie = {
        name: "No miren arriba",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR1k8lyh-hGMTv2uV2pn7uwFzK4VEtvdXSSBgX9mHkg05wHYc7z",
        synopsis: "Dos astrónomos mediocres descubren que, en pocos meses, un meteorito destruirá el planeta Tierra. A partir de ese momento, intentan advertir a la humanidad del peligro que se avecina a través de los medios de comunicación.",
        releaseYear: 2021
    } 
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
} );

test('PUT /movies/:id debe actualizar una película', async() => {

    const movie = {
        name:"No Miren Arriba"
    } 
    const res = await request(app).put('/movies/'+id).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);

} );

test('POST /movies/:id/genres debe asignarle géneros a una pelicula', async() => {
    const genre = await Genre.create({
        name:"Accion"
    } );
    
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
     expect(res.body.length).toBe(1);
} );

test('POST /movies/:id/actors debe asignarle actores a una pelicula', async() => {

    const actor = await Actor.create({
        firstName:"Leonardo",
        lastName: "DiCaprio",
        nationality:"Estadounidense",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Leonardo_DiCaprio_in_2023_%28cropped%29.png/330px-Leonardo_DiCaprio_in_2023_%28cropped%29.png",
        birthday:"1974-11-11"
    } );
    
    
     const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
     await actor.destroy();
     expect(res.status).toBe(200);
     expect(res.body).toBeInstanceOf(Array);
     expect(res.body.length).toBe(1);
 } );

test('POST /movies/:id/directors debe asignarle directores a una pelicula', async() => {
    
    const director = await Director.create({
        firstName:"Christopher Edward",
        lastName: "Nolan",
        nationality:"Estadounidense",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Christopher_Nolan_Cannes_2018.jpg/330px-Christopher_Nolan_Cannes_2018.jpg",
        birthday:"1970-07-30"
    } );
     const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
     await director.destroy();
     expect(res.status).toBe(200);
     expect(res.body).toBeInstanceOf(Array);
     expect(res.body.length).toBe(1);
 } );

test('DELETE /movies/:id debe eliminar una película', async() => {
     const res = await request(app).delete('/movies/'+id);
     expect(res.status).toBe(204);
     

} );











