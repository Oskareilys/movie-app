const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.belongsToMany(Genre, {through: "movie_genres"});
Genre.belongsToMany(Movie, {through: "movie_genres"});

Movie.belongsToMany(Actor, {through: "movie_actors"});
Actor.belongsToMany(Movie, {through: "movie_actors"});

Movie.belongsToMany(Director, {through: "movie_directors"});
Director.belongsToMany(Movie, {through: "movie_directors"});