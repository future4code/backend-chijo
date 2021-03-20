## Exercício 1

```sql
CREATE TABLE Actor (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    salary FLOAT NOT NULL,
    birth_date DATE NOT NULL,
	gender VARCHAR(6) NOT NULL
);
```

**a. Nesta tabela, utilizamos o `FLOAT` para declarar o salário, porque esta é uma forma de representar um número não inteiro em uma tabela. Explique os demais comandos que estão nessa query.**

*id: string de no máximo 255 caracteres, única e não nula (chave primária)
name: string de no máximo 255 caracteres e não nula
birth_date: data no formato YYYY/MM/DD não nula
gender: string de no máximo 6 caracteres não nula*

**b. O comando SHOW é bem útil para nos prover informações sobre bancos, tabelas, e mais. Utilize os comandos: SHOW DATABASES e SHOW TABLES. Explique os resultados.**
Ele mostra uma tabela com todos os bancos e tabelas disponíveis

**c. O comando DESCRIBE pode ser usado para ver estrutura de uma tabela. Utilize o comando  DESCRIBE Actor e explique os resultados.**
Mostra um resumo do que foi explicado na questão a

---
## Exercício 2

**a. Escreva uma query que crie a atriz `Glória Pires`, com o id `002`, salário R$1.200.000 e data de nascimento 23 de Agosto de 1963**

```sql
INSERT INTO Actor VALUES ("002", "Glória Peres", 1200000, "1963-08-23", "female");
```

**b. Escreva uma query que tente adicionar um outro elemento a tabela com o mesmo id do item anterior `002`. Isso gerará um erro. Anote a mensagem de erro, traduza (pode usar o Google Tradutor diretamente) e explique porque esse erro aconteceu.**
Entrada duplicada "002" para a chave primária, a chave primária deve ser única e não nula

**Tente usar as queries abaixo. Você vai reparar que elas vão gerar um erro. Anote as mensagens de erro, traduza (pode usar o Google Tradutor diretamente) e explique porque esses erros aconteceram. Por fim, corrija individualmente cada query para que funcione, teste o comando e anote-o também como resposta**

**Item c**

```sql
INSERT INTO Actor (id, name, salary)
VALUES(
  "003",
  "Fernanda Montenegro",
  300000,
  "1929-10-19",
  "female"
);
```
Erro: Contagem de colunas não corresponde à contagem dos valores. Acontece porque declaramos 3 colunas e passamos 5 valores

**Item d**

```sql
INSERT INTO Actor (id, salary, birth_date, gender)
VALUES(
  "004",
  400000,
  "1949-04-18",
  "male"
);
```
Erro: o campo nome não tem um valor padrão. Ele é obrigatório e não foi definido nenhum fallback

**Item e**
```sql
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005",
  "Juliana Paes",
  719333.33,
  1979-03-26,
  "female"
);
```
Erro: formato incorreto de data, ele deve ser uma string YYYY-MM-DD

---
## Exercício 3

**a. Escreva uma query que retorne todas as informações das atrizes**
```sql
SELECT * FROM Actor WHERE gender = "female";
```


**b. Escreva uma query que retorne o salário do ator com o nome `Tony Ramos`**
```sql
SELECT salary FROM Actor WHERE name = "Tony Ramos";
```

**c. Escreva uma query que retorne todas as informações que tenham o `gender` com o valor `"invalid"`. Explique o resultado.**
Nada é retornado pois todos os generos inseridos são válidos

**d. Escreva uma query que retorne o id, nome e salário de todos que tenham o salário com o valor máximo de R$500.000**
```sql
SELECT id, name, salary FROM Actor WHERE salary <= 500000;
```

**e. Tente usar a query abaixo. Você vai reparar que ela vai gerar um erro. Anote a mensagem de erro, traduza (pode usar o Google Tradutor diretamente) e explique porque esse erro aconteceu. Por fim, corrija individualmente a query para que funcione, teste o comando e anote-o também como resposta**
Coluna nome desconhecida, o nome da coluna é name e não nome

---
## Exercício 4

```sql
SELECT * FROM Actor WHERE (name LIKE "A%" OR name LIKE "J%") AND salary > 300000;
```

**a. Explique com as suas palavras a query acima**
Pega todos os dados de atores que comecem com a letra A ou J e ganhem mais de 300k

**b. Escreva uma query com os atores que não comecem com a letra "A" e tenham o salário maior do que R$350.000,00**
```sql
SELECT * FROM Actor WHERE name NOT LIKE "A%" AND salary > 350000;
```

**c. Escreva uma query com os atores que possuam "G" ou "g" em qualquer parte do nome.**
```sql
SELECT * FROM Actor WHERE name LIKE "%G%" OR name LIKE "%g%";
```

**d. Escreva uma query com os atores que tenham a lerta "a" ou "A" ou "g" ou "G" no nome e o salário entre R$350.000,00 e R$900.000,00**
```sql
SELECT * FROM Actor WHERE
 (name LIKE "%G%" OR name LIKE "%g%" OR name LIKE "%A%" OR name LIKE "%a%")
 AND salary BETWEEN 350000 AND 950000;
```

---
## Exercício 5

```sql
CREATE TABLE Movies (
	id VARCHAR(255) PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    synopsis TEXT NOT NULL,
    releaseDate DATE NOT NULL,
    rating TINYINT
);

INSERT INTO Movies VALUES(
"004",
"Bacurau",
"Os moradores de Bacurau, um pequeno povoado do sertão brasileiro, descobrem que a comunidade não consta mais em qualquer mapa. Aos poucos, eles percebem algo estranho na região: enquanto drones passeiam pelos céus, estrangeiros chegam à cidade.",
"2019-08-23",
9
);
```

---
## Exercício 6

```sql
SELECT id, title, rating FROM Movies WHERE id = "004";
SELECT * FROM Movies WHERE title = "Bacurau";
SELECT id, title, synopsis FROM Movies WHERE rating > 7;
```

---
## Exercício 7
```sql
SELECT * FROM Movies WHERE title LIKE "%vida%";
SELECT * FROM Movies WHERE title LIKE "%vida%" OR synopsis LIKE "%vida%";
SELECT * FROM Movies WHERE releaseDate < "2021-03-20";
SELECT * FROM Movies WHERE releaseDate < "2021-03-20" AND (title LIKE "%vida%" OR synopsis LIKE "%vida%") AND rating > 7;
```