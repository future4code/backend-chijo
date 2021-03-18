// Tipos
type prato = {
    nome: string,
    custo: number,
    valorVenda: number,
    ingredientes?: string[]
}

type venda = {
    nomePrato: string,
    nomeCliente: string
}


// Variáveis Globais
var cardapio: prato[] = []
var vendas: venda[] = []


// Funções
const cadastrarProduto = (produto: prato): void => {
    cardapio.push(produto)
    console.log("Prato cadastrado com sucesso!")
}

const consultaValorProduto = (nomeProduto: string): void => {
    const prato = cardapio.find((prod: prato) => prod.nome === nomeProduto)
    if (prato){
        console.log(`${nomeProduto} custa R$${prato.valorVenda}`)
    } else {
        console.log(`${nomeProduto} não cadastrado!`)
    }

}

const venderPrato = (produto: string, cliente: string): void => {
    const prato = cardapio.find((prod: prato) => prod.nome === produto)
    if (prato){
        vendas.push({nomePrato: produto, nomeCliente: cliente})
        console.log("Venda cadastrada com sucesso!")
    } else {
        console.log(`${produto} não cadastrado!`)
    }
}

const determinaLucro = () => {
    let lucro: number = 0
    vendas.forEach((v: venda) => {
        const prod: prato = cardapio.find((p: prato) => {
            return p.nome === v.nomePrato
        })
        lucro += prod.valorVenda - prod.custo
    })
    console.log(`Seu lucro foi de R$${lucro.toFixed(2)}`)
}


// Teste cadastrarProduto()
const refri: prato = {
    nome: "Refrigerante",
    custo: 5,
    valorVenda: 10
}

const batataFrita: prato = {
    nome: "Batata Frita",
    custo: 10,
    valorVenda: 20
}

const hamburguer: prato = {
    nome: "Hambúrguer",
    custo: 15,
    valorVenda: 30
}

cadastrarProduto(refri)
cadastrarProduto(batataFrita)
cadastrarProduto(hamburguer)

console.table(cardapio)

// Teste consultaValorProduto()
consultaValorProduto("Refrigerante")
consultaValorProduto("Banana Split")

// Teste venderPrato()
venderPrato("Refrigerante", "Matheus")
venderPrato("Hambúrguer", "João")
venderPrato("Batata Frita", "Chijo")
venderPrato("Banana Split", "Caio")
console.table(vendas)

// Teste determinaLucro()
determinaLucro()