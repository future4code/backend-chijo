const fat = require("./ex11")

const quantidadeAnagramas = (palavra: string): void => {
    let quantidade = 0

    // Testa se existe repetições na palavra
    if (!/(.).*\1/.test(palavra)){
        quantidade = fat(palavra.length)
    } else {
        // Apenas uma letra repete
        let letraRepetida = ""

        // Acha qual é a letra repetida
        for (let i = 0; i < palavra.length; i++){
            for (let j = 0; j < palavra.length; j++){
                if (i != j){
                    if (palavra[i] === palavra[j]){
                        letraRepetida = palavra[j]
                        break
                    }
                }
            }
        }

        // Verifica quantidade de vezes que ela aparece
        const matchExpression = new RegExp(letraRepetida,"g")
        const reps = palavra.match(matchExpression).length

        // Cálculo da quantidade de Anagramas
        quantidade = fat(palavra.length)/fat(reps)
    }
    console.log(`Anagramas possíveis de "${palavra}": ${quantidade}`)
}

quantidadeAnagramas("anagrama")
quantidadeAnagramas("mesa")