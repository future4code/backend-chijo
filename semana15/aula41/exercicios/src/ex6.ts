enum Siglas {
    AC = "AC",
    DC = "DC"
}

const determinaIdadeHistorica = (ano: number, sigla?: Siglas): void => {
    // Tratamento de Erros
    if (sigla !== Siglas.AC && sigla !== Siglas.DC && sigla !== undefined) {
        console.log("Sigla inválida")
    } else if (ano < 0 || (sigla === "AC" && ano > 100000) || (sigla === "DC" && ano > 2021) ) {
        console.log("Ano inválido")

    // Seleção dos anos
    } else {
        if (sigla === Siglas.AC){
            if (ano >= 4000 && ano < 100000) console.log("Pré-História")
            else if (ano >= 1 && ano < 4000) console.log("Idade Antiga")
        } else {
            if (ano >= 1 && ano < 476) console.log("Idade Antiga")
            else if (ano >= 476 && ano < 1453) console.log("Idade Média")
            else if (ano >= 1453 && ano < 1789) console.log("Idade Moderna")
            else if (ano >= 1789 && ano < 2021) console.log("Idade Contemporânea")
        }
    }
}

determinaIdadeHistorica(2000, Siglas.DC)