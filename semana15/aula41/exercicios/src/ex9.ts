const convertDnaToRna = (dna: string): string => {
    const rnaPrevio =   dna
                        .replace(/A/g, "U")
                        .replace(/T/g, "1")
                        .replace(/C/g, "2")
                        .replace(/G/g, "C")

    return rnaPrevio.replace(/1/g, "A").replace(/2/g, "G")
}

console.log(convertDnaToRna("ATTGCTGCGCATTAACGACGCGTA"))
//Resposta: UAACGACGCGUAAUUGCUGCGCAU