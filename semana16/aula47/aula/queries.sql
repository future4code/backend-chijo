-- Aula 47

-- Criação da tabela User com inserção de dados e Select
CREATE TABLE User (
 id VARCHAR(255) PRIMARY KEY,
 name VARCHAR(255),
 gender ENUM('male', 'female')
);
INSERT INTO User VALUES
('a', 'Alice', 'female'),
('b', 'Bob', 'male');

SELECT * FROM User;


-- Criação da tabela Supplier com inserção de dados e Select
CREATE TABLE Supplier (
 id VARCHAR(255) PRIMARY KEY,
 name VARCHAR(255),
 gender ENUM('male', 'female')
);
INSERT INTO Supplier
VALUES
('c', 'Coragem', 'male'),
('d', 'Dory', 'female');

SELECT * FROM Supplier;


-- Criação da tabela Account, relacionada com a tabela User (1:1), com inserção de dados e Select
CREATE TABLE Account (
 id INT PRIMARY KEY,
 balance FLOAT,
 user_id VARCHAR(255),
 FOREIGN KEY (user_id) REFERENCES User(id)
);

INSERT INTO Account VALUES
(659182, 1000.99, 'a'),
(662834, 1000.99, 'b');

SELECT * FROM Account;


-- Criação da tabela Product, relacionada com a tabela Supplier (1:N), com inserção de dados e Select
CREATE TABLE Product (
 id VARCHAR(255) PRIMARY KEY,
 name VARCHAR(255) UNIQUE,
 price FLOAT,
 supplier_id VARCHAR(255),
 FOREIGN KEY (supplier_id ) REFERENCES Supplier(id)
);

INSERT INTO Product VALUES
('okm','cenoura' , 10.00, 'c'),
('uhb','abacate', 11.50, 'c'),
('ygv','cebola', 12.00, 'c'),
('ijn','camarão', 21.50, 'd'),
('tfc','lula', 22.00, 'd');

SELECT * FROM Product;


-- Criação da tabela relacional Sales, que liga as tabelas de Produtos e Usuários (N:M), com inserção de dados e Select
CREATE TABLE Sale (
 user_id VARCHAR(255),
 product_id VARCHAR(255),
 FOREIGN KEY (user_id) REFERENCES User(id),
 FOREIGN KEY (product_id) REFERENCES Product(id)
);

INSERT INTO Sale VALUES
('b', 'okm'), ('b','uhb'), ('a','ygv'), ('b','ygv'),('b','ijn'), ('b','tfc'), ('a','tfc');

SELECT * FROM Sale;


-- Select: pegar saldo e nome da pessoa
SELECT User.name, Account.balance
FROM Account JOIN User ON Account.user_id = User.id;

-- Select: compra => nome do cliente, nome do produto e nome do fornecedor
SELECT User.name as "Cliente", Product.name as "Produto", Supplier.name as "Fornecedor"
FROM Sale
JOIN User ON Sale.user_id = User.id
JOIN Product ON Sale.product_id = Product.id
JOIN Supplier ON Product.supplier_id = Supplier.id;






