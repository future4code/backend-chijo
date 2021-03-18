// a) Como fazemos para acessar os parâmetros passados na linha de comando para o Node?
// Com process.argv, que é um array e à partir do indice 2 possui os parametros

// b) Crie um programa que receba seu nome e sua idade. Após receber estes valores,
// imprima no console uma mensagem que siga a seguinte estrutura:
// "Olá, (Nome)! Você tem (sua idade) anos."

// c) Altere o programa acima para que mostre também a sua idade daqui a sete anos.
// "Olá, (Nome)! Você tem (sua idade) anos. Em sete anos você terá (nova idade)"

const nome = process.argv[2]
const idade = parseInt(process.argv[3])
const green = "\033[0;32m"
const red = "\033[0;31m"

if (!nome){
    console.log(`${red} Escreva o parâmetro nome!`)
} else if (isNaN(idade)){
    console.log(`${red} A idade deve ser um número!`)
} else {
    console.log(`${green} Olá, ${nome}! Você tem ${idade} anos. Em sete anos você terá ${idade+7}`)
}
