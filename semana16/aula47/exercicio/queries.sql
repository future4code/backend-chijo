-- Exercício Aula 47

-- Exercício 1
CREATE TABLE Rating (
	id VARCHAR(255) PRIMARY KEY,
    comment TEXT NOT NULL,
	rate FLOAT NOT NULL,
    movie_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
);

SELECT * FROM Movie;

INSERT INTO Rating VALUES
("1", "Bem legal!", 7, "001"),
("2", "Excelente!", 10, "002"),
("3", "Impressionante", 9, "004"),
("4", "Um dos melhores filmes do mundo", 9, "001"),
("5", "Bacana", 8, "002");

INSERT INTO Rating VALUES ("7", "Teste Falho", 10, "xxx"); -- Não funciona porque não existe um filme com esse id

ALTER TABLE Movie DROP COLUMN rating;

DELETE FROM Movie WHERE id = "004"; -- Não funciona porque é usado como FK na tabela de Rating

-- Exercício 2
CREATE TABLE MovieCast (
	movie_id VARCHAR(255),
    actor_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (actor_id) REFERENCES Actor(id)
);

SELECT * FROM Actor;

INSERT INTO MovieCast VALUES
("001", "002"),
("001", "003"),
("001", "004"),
("002", "001"),
("002", "002"),
("002", "005"),
("003", "003"),
("003", "004"),
("004", "002"),
("004", "005");


-- Exercício 3
SELECT * FROM Movie
INNER JOIN Rating ON Movie.id = Rating.movie_id;

SELECT Movie.id, Movie.title, Rating.rate FROM Movie INNER JOIN Rating ON Rating.movie_id = Movie.id;


-- Exercício 4
SELECT Movie.id, Movie.title, Rating.rate, Rating.comment FROM Rating RIGHT JOIN Movie ON Rating.movie_id = Movie.id;

SELECT Movie.id, Movie.title, MovieCast.actor_id FROM MovieCast
INNER JOIN Movie ON MovieCast.movie_id = Movie.id;

SELECT Movie.title, AVG(Rating.rate) as "Média" FROM Rating
RIGHT JOIN Movie ON Rating.movie_id = Movie.id
GROUP BY Movie.id;


-- Exercício 5
SELECT Movie.id as "movie_id", Movie.title as "movie_title", Actor.id as "actor_id", Actor.name as "actor_name" FROM Movie
LEFT JOIN MovieCast ON Movie.id = MovieCast.movie_id
JOIN Actor ON Actor.id = MovieCast.actor_id;

SELECT Movie.title, Actor.name, Rating.rate, Rating.comment FROM MovieCast
INNER JOIN Rating ON MovieCast.movie_id = Rating.movie_id
INNER JOIN Movie ON MovieCast.movie_id = Movie.id
INNER JOIN Actor ON MovieCast.actor_id = Actor.id;


-- Exercício 6
CREATE TABLE Oscar (
	id VARCHAR(255) PRIMARY KEY,
    name ENUM("Melhor Filme", "Melhor Direção", "Melhor Roteiro"),
    date DATE NOT NULL
);

INSERT INTO Oscar VALUES
("1", "Melhor Filme", "2020-01-01"),
("2", "Melhor Direção", "2020-01-01"),
("3", "Melhor Roteiro", "2020-01-01");

CREATE TABLE OscarWinners (
	movie_id VARCHAR(255),
    oscar_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id),
    FOREIGN KEY (oscar_id) REFERENCES Oscar(id)
);

INSERT INTO OscarWinners VALUES
("001", "1"),
("004", "2"),
("004", "3");

SELECT Movie.title, Oscar.name, Oscar.date FROM Movie
LEFT JOIN OscarWinners ON Movie.id = OscarWinners.movie_id
LEFT JOIN Oscar ON Oscar.id = OscarWinners.oscar_id;
