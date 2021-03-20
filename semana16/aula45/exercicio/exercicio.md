## Exercício 1

**a.**

```sql
ALTER TABLE Actor DROP COLUMN salary;
```
Altera a tabela de atores deletando a coluna de salário

**b.**

```sql
ALTER TABLE Actor CHANGE gender sex VARCHAR(6);
```
Altera a coluna de atores trocando o nome da coluna de gender para sex, que é uma string de até 6 caracteres

**c.**

```sql
ALTER TABLE Actor CHANGE gender gender VARCHAR(255);
```
Altera a coluna de atores para fazer com que a coluna gender seja uma string de até 255 caracteres

**d. Agora,  altere a coluna gender da tabela ACTOR para que ele aceite strings com até 100 caracteres**
```sql
ALTER TABLE Actor CHANGE gender gender VARCHAR(100) NOT NULL;
```

---

## Exercício 2

**a. Escreva uma query que atualize o nome e a data de nascimento do ator com o id `003`**

**b. Escreva uma query que atualize o nome da atriz `Juliana Paes` para `JULIANA PÃES`. Então, escreva outra query para voltar ao nome anterior.**

**c. Escreva uma query que atualize todas as informações do ator com o id `005`**

**d. Escreva uma query em que você tente atualizar um dado da tabela que não existe (com um id inválido, por exemplo). Teste, anote e explique o resultado.**
Não dá um erro mas 0 linhas são afetadas pela mudança

---
## Exercício 3

**a. Escreva uma query que apague a atriz com o nome `Fernanda Montenegro`**
```sql
DELETE FROM Actor WHERE name = "Fernanda Montenegro";
```

**b. Escreva uma query que apague todos os atores (do gênero `male`) com o salário maior do que R$1.000.000,00**
```sql
DELETE FROM Actor WHERE gender = "male" AND salary > 1000000;
```

---

## Exercício 4

**a. Escreva uma query que pegue o maior salário de todos os atores e atrizes**
```sql
SELECT MAX(salary) FROM Actor;
```

**b. Escreva uma query que pegue o menor salário das atrizes**
```sql
SELECT MIN(salary) FROM Actor WHERE gender="female";
```

**c. Escreva uma query que pegue a quantidade de atrizes**
```sql
SELECT COUNT(*) FROM Actor WHERE gender="female";
```

**d. Escreva uma query que pegue a soma de todos os salários**
```sql
SELECT SUM(salary) FROM Actor;
```

---

## Exercício 5

**a. Releia a última query. Teste-a. Explique o resultado com as suas palavras**
Mostra quantos atores de cada gênero a tabela tem

**b. Faça uma query que retorne somente o id e o nome dos atores em ordem decrescente alfabética**
```sql
SELECT id, name FROM Actor ORDER BY name DESC;
```

**c. Faça uma query que retorne todos os atores ordenados pelo salário**
```sql
SELECT * FROM Actor ORDER BY salary;
```

**d. Faça uma query que retorne os atores com os três maiores salarios**
```sql
SELECT * FROM Actor ORDER BY salary DESC LIMIT 3;
```

**e. Faça uma query que retorne a média de salário por gênero**
```sql
SELECT AVG(salary), gender FROM Actor GROUP BY gender;
```

---

## Exercício 6

**a. Altere a tabela de `Movie` e adicione um novo parâmetro: `playing_limit_date` que indique a data limite em que o filme será passado no cinema.**
```sql
ALTER TABLE Movie ADD COLUMN playing_limit_date DATE;
```

**b. Altere a tabela de `Movie` para que o parâmetro `rating` possa aceitar valores não inteiros, como, por exemplo, uma avaliação `8.5`.**
```sql
ALTER TABLE Movie CHANGE rating rating FLOAT NOT NULL;
```

**c. Atualize dois filmes de tal forma que tenhamos um que ainda esteja em cartaz e um que já tenha saído**
```sql
UPDATE Movie SET playing_limit_date = "2021-05-05" WHERE id = "001";
UPDATE Movie SET playing_limit_date = "2020-03-03" WHERE id = "002";
```

**d. Delete algum dos filmes, mas guarde o id. Tente fazer uma query para atualizar a sinopse desse filme que você acabou de deletar (usando o mesmo id). Anote o resultado e explique.**
```sql
DELETE FROM Movie WHERE id = "003";
UPDATE Movie SET synopsis = "Teste" WHERE id = "003";
```
Comando não dá erro mas altera 0 linhas

---

## Exercício 7

**a. Quantos filmes em cartaz possuem avaliações maiores do que `7.5`?**
```sql
SELECT COUNT(*) FROM Movie WHERE rating > 7.5 AND playing_limit_date > current_date();
```

**b. Qual a média das avaliações dos filmes?**
```sql
SELECT AVG(rating) FROM Movie;
```

**c. Qual a quantidade de filmes em cartaz?**
```sql
SELECT COUNT(*) FROM Movie WHERE playing_limit_date > current_date();
```

**d. Qual a quantidade de filmes que ainda irão lançar?**
```sql
SELECT COUNT(*) FROM Movie WHERE release_date > current_date();
```

**e. Qual a maior nota dos filmes?**
```sql
SELECT MAX(rating) FROM Movie;
```

**f. Qual a menor nota dos filmes?**
```sql
SELECT MIN(rating) FROM Movie;
```

---

## Exercício 8

**a. Retorne todos os filmes em ordem alfabética**
```sql
SELECT * FROM Movie ORDER BY title;
```

**b. Retorne os 5 primerios filmes em ordem descrente alfabética**
```sql
SELECT * FROM Movie ORDER BY title DESC LIMIT 5;
```

**c. Retorne os 3 filmes mais recentes em cartaz**
```sql
SELECT * FROM Movie
  WHERE playing_limit_date >= current_date()
  ORDER BY release_date DESC
  LIMIT 3;
```

**d. Retorne os 3 filmes melhor avalidos**
```sql
SELECT * FROM Movie ORDER BY rating DESC LIMIT 3;
```