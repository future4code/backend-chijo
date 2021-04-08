-- Aula 44

-- Criação da Tabela de Atores
CREATE TABLE Actor (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    salary FLOAT NOT NULL,
    birth_date DATE NOT NULL,
	gender VARCHAR(6) NOT NULL
);

-- Mostrar todas as tabelas criadas
SHOW TABLES;

-- Mostrar colunas de uma tabela
DESCRIBE Actor;

-- Inserir dados na tabela de atores
INSERT INTO Actor (id, name, salary, birth_date, gender) VALUES
 ("001","Tony Ramos", 400000,"1948-08-25", "male"),
 ("002", "Glória Pires", 1200000,"1923-08-23", "female"),
 ("003", "Fernanda Montenegro", 300000, "1929-10-19", "female"),
 ("004", "Antônio Fagundes", 400000, "1949-04-18", "male"),
 ("005", "Juliana Paes", 719333.33, "1979-03-26", "female");

-- Visualizar tabela inteira
SELECT * FROM Actor;

-- Queries diferentes
SELECT id, salary from Actor;

SELECT id, name from Actor WHERE gender = "male";

SELECT * FROM Actor WHERE gender = "female";

SELECT salary FROM Actor WHERE name = "Tony Ramos";

SELECT * FROM Actor WHERE gender = "invalid";

SELECT id, name, salary FROM Actor WHERE salary <= 500000;

SELECT id, nome from Actor WHERE id = "002";

SELECT * FROM Actor WHERE (name LIKE "A%" OR name LIKE "J%") AND salary > 300000;

SELECT * FROM Actor WHERE (name NOT LIKE "A%") AND salary > 350000;

SELECT * FROM Actor WHERE
 (name LIKE "%G%" OR name LIKE "%g%" OR name LIKE "%A%" OR name LIKE "%a%")
 AND salary BETWEEN 350000 AND 950000;


-- Criação da tabela de filmes
CREATE TABLE Movie (
	id VARCHAR(255) PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    release_date DATE NOT NULL,
    rating TINYINT,
    synopsis TEXT NOT NULL
);

-- Inserir dados na tabela de filmes
INSERT INTO Movie VALUES
  ("001", "Se Eu Fosse Você", "2006-01-06", 7, "Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos"),
  ("002", "Doce de mãe", "2012-12-27", 10, "Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela"),
  ("003", "Dona Flor e Seus Dois Maridos", "2017-11-02", 5, "Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce."),
  ("004", "Bacurau", "2019-08-23", 9, "Os moradores de Bacurau, um pequeno povoado do sertão brasileiro, descobrem que a comunidade não consta mais em qualquer mapa. Aos poucos, eles percebem algo estranho na região: enquanto drones passeiam pelos céus, estrangeiros chegam à cidade.");

-- Visualizar tabela inteira
SELECT * FROM Movie;

-- Queries diferentes
SELECT id, title, rating FROM Movie WHERE id = "004";

SELECT * FROM Movie WHERE title = "Bacurau";

SELECT id, title, synopsis FROM Movie WHERE rating > 7;

SELECT * FROM Movie WHERE title LIKE "%vida%";

SELECT * FROM Movie WHERE title LIKE "%vida%" OR synopsis LIKE "%vida%";

SELECT * FROM Movie WHERE releaseDate < "2021-03-20";

SELECT * FROM Movie WHERE releaseDate < "2021-03-20" AND (title LIKE "%vida%" OR synopsis LIKE "%vida%") AND rating > 7;

-- -------------------------------------------------------------------------------------
-- Aula 45

-- Alterar coluna
ALTER TABLE Actor CHANGE gender gender VARCHAR(100) NOT NULL;

-- Alterar valores
SET SQL_SAFE_UPDATES = 0;
UPDATE Actor SET birth_date = "1994-03-03" WHERE id="003";
UPDATE Actor SET name = "Juliana Paes" WHERE name = "Juliana Pães";
UPDATE Actor SET
	name = "Moacyr Franco",
	birth_date = "2020-02-10",
    salary = 600000,
    gender = "male"
WHERE id = "005";
UPDATE Actor SET birth_date = "1994-03-03" WHERE id="006";

-- Deletar valores
DELETE FROM Actor WHERE name = "Fernanda Montenegro";

DELETE FROM Actor WHERE gender = "male" AND salary > 1000000;

-- Selecionar dados
SELECT MAX(salary) FROM Actor;

SELECT MIN(salary) FROM Actor WHERE gender="female";

SELECT COUNT(*) FROM Actor WHERE gender="female";

SELECT SUM(salary) FROM Actor;

SELECT id, name FROM Actor ORDER BY name DESC;

SELECT * FROM Actor ORDER BY salary;

SELECT * FROM Actor ORDER BY salary DESC LIMIT 3;

SELECT AVG(salary), gender FROM Actor GROUP BY gender;


-- Tabela Movie
ALTER TABLE Movie ADD COLUMN playing_limit_date DATE;

ALTER TABLE Movie CHANGE rating rating FLOAT NOT NULL;

UPDATE Movie SET playing_limit_date = "2021-05-05" WHERE id = "001";
UPDATE Movie SET playing_limit_date = "2020-03-03" WHERE id = "002";
UPDATE Movie SET playing_limit_date = "2021-10-10" WHERE id = "004";

DELETE FROM Movie WHERE id = "003";
UPDATE Movie SET synopsis = "Teste" WHERE id = "003";

SELECT COUNT(*) FROM Movie WHERE rating > 7.5 AND playing_limit_date > current_date();
SELECT AVG(rating) FROM Movie;
SELECT COUNT(*) FROM Movie WHERE playing_limit_date > current_date();
SELECT COUNT(*) FROM Movie WHERE release_date > current_date();
SELECT MAX(rating) FROM Movie;
SELECT MIN(rating) FROM Movie;

SELECT * FROM Movie ORDER BY title;
SELECT * FROM Movie ORDER BY title DESC LIMIT 5;
SELECT * FROM Movie WHERE playing_limit_date >= current_date() ORDER BY release_date DESC LIMIT 3;
SELECT * FROM Movie ORDER BY rating DESC LIMIT 3;

SELECT * FROM Movie;
