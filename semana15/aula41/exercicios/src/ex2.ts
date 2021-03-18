// a) Entradas: array numeros | Saídas: objeto {maior, menor, media}
// b) Variáveis: numerosOrdenados, a, b, soma, estatísticas
// c) Type de amostra de dados

type stats = {
    maior: number,
    menor: number,
    media: number
}

type amostra = {
    numeros: number[],
    obterStats: (numeros: number[]) => stats
}

function obterEstatisticas(numeros: number[]): stats {

    const numerosOrdenados: number[] = numeros.sort(
        (a: number, b: number) => a - b
    )

    let soma: number = 0
    for (let num of numeros) {
        soma += num
    }

    const estatisticas: stats = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }

    return estatisticas
}

const amostraDeIdades: amostra = {
    numeros: [21, 18, 65, 44, 15, 18],
    obterStats: obterEstatisticas
}

console.log(amostraDeIdades.obterStats(amostraDeIdades.numeros))