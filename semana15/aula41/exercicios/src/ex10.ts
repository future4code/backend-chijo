const imprimeStringReversa = (palavra: string): void => {
    let palavraReversa: string = ""
    for (let i = palavra.length - 1; i >= 0; i-- ){
        palavraReversa += palavra[i]
    }
    console.log(palavraReversa)
}

imprimeStringReversa("abcd")