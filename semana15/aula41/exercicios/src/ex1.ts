// a) Crie uma variável minhaString do tipo string e atribua um valor a ela.
// Tente atribuir um número a esta variável. O que acontece?

// const minhaString: string = 4
// Aparece um erro no VSCode explicando que só posso atribuir strings

// b) Crie uma variável meuNumero do tipo number e atribua um valor numérico.
// Como podemos fazer para que essa variável também aceite strings?
let meuNumero: number | string = 0

// c) Agora crie um novo objeto. Este objeto é uma pessoa, e deve possuir três propriedades
// Como você faria para garantir que o objeto só tenha as propriedades descritas acima?

const chijo: {nome: string, idade: number, corFavorita: string} = {
    nome: "Letícia Chijo",
    idade: 27,
    corFavorita: "Azul"
}

// d) Crie mais três objetos, que também precisam ter apenas os campos definidos acima.
// Crie um tipo Pessoa para garantir que todos os objetos tenham os mesmos campos.

type person = {
    nome: string,
    idade: number,
    corFavorita: string
}

const lais: person = {
    nome: "Laís Pietra",
    idade: 24,
    corFavorita: "Laranja"
}

// e) Modifique o tipo de objeto para que possamos apenas escolher entre as cores do arco-íris. Utilize um enum para isso.

enum Cores {
    AMARELO = "Amarelo",
    LARANJA = "Laranja",
    VERMELHO = "Vermelho",
    VIOLETA = "Violeta",
    AZUL_ESCURO = "Azul Escuro",
    VERDE = "Verde",
    AZUL_ANIL = "Azul Anil"
}

type person2 = {
    nome: string,
    idade: number,
    corFavorita: Cores
}

const caio: person2 = {
    nome: "Caio Teixeira",
    idade: 24,
    corFavorita: Cores.AZUL_ESCURO
}