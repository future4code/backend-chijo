type pokemon = {
	name: string,
  types: string,
	healthPoints: number
}

const pokemon1: pokemon = {
  name: "Charmander",
  types: "Fire",
  healthPoints: 28
}

const pokemon2: pokemon = {
  name: "Bulbasaur",
  types: "Grass/Poison",
  healthPoints: 31
}

const pokemon3: pokemon = {
  name: "Squirtle",
  types: "Water",
  healthPoints: 35
}

// a) Como você faria, já com a extensão instalada, para gerar um arquivo javascript
// a partir do  arquivo typescript com o código abaixo?
// R: tsc ex4.ts

// b) E se este arquivo estivesse dentro de uma pasta chamada src.
// O processo seria diferente? Se sim, descreva as diferenças.
// R: tsc ./src/ex4.ts

// c) Existe alguma maneira de transpilar múltilplos arquivos de uma vez só?
// Caso conheça, explique como fazer.
// R: Criando o tsconfig.json e colocando todos os arquivos ts em uma pasta src, então
// para transpilar depois disso é só dar o comando tsc