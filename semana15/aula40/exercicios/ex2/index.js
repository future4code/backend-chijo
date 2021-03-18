// Crie uma aplicação Node que recebe uma string
// representando uma operação matemática e dois valores
// numéricos. O retorno deverá ser o resultado da
// operação selecionada utilizando os 2 valores fornecidos.

const operation = process.argv[2]
const num1 = Number(process.argv[3])
const num2 = Number(process.argv[4])
let result = 0

switch(operation){
    case "add":
        result =  num1 + num2
        break
    case "sub":
        result = num1 - num2
        break
    case "mult":
        result = num1 * num2
        break
    case "div":
        result = num1 / num2
        break
    default:
        result = NaN
        break
}

const green = "\033[0;32m"
const red = "\033[0;31m"


if (!operation){
    console.log(`${red} Erro: Escolha uma operação`)
} else if (isNaN(num1)) {
    console.log(`${red} Erro: O primeiro número está incorreto`)
} else if (isNaN(num2)) {
    console.log(`${red} Erro: O segundo número está incorreto`)
} else if (isNaN(result)){
    console.log(`${red} Erro`)
} else {
    console.log(`${green} Resposta: ${result}`)
}
