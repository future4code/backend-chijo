enum TipoDeRoupa {
    VERAO = "Verão",
    INVERNO = "Inverno",
    BANHO = "Banho",
    INTIMAS = "Íntimas"
}

type produto = {
    nome: string,
    preco: number,
    tipo: TipoDeRoupa
}

type produtoComDesconto = {
    nome: string,
    preco: number,
    tipo: TipoDeRoupa,
    precoComDesconto: number
}

const determinaDesconto = (produtos: produto[]): produtoComDesconto[] => {
    return produtos.map((prod: produto)=>{
        let multiplicador = 1
        switch (prod.tipo) {
            case TipoDeRoupa.VERAO:
                multiplicador = 0.95
                break
            case TipoDeRoupa.INVERNO:
                multiplicador = 0.9
                break
            case TipoDeRoupa.BANHO:
                multiplicador = 0.96
                break
            case TipoDeRoupa.INTIMAS:
                multiplicador = 0.93
                break
        }
        return {...prod, precoComDesconto: multiplicador * prod.preco}
    })
}

const produtos: produto[] = [
    {nome: "Biquini", preco: 100, tipo: TipoDeRoupa.BANHO},
    {nome: "Casaco", preco: 200, tipo: TipoDeRoupa.INVERNO},
    {nome: "Shorts", preco: 300, tipo: TipoDeRoupa.VERAO}
]

console.table(determinaDesconto(produtos))
