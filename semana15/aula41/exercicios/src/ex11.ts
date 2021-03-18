const fatorial = (numero: number): number => {
    if (numero === 1 || numero === 0) {
        return 1
    } else {
        if (numero - 1 === 1) {
            return numero * (numero - 1)
        } else {
            return numero * fatorial(numero-1)
        }
    }
}

// 6! = 6*5*4*3*2*1 = 720
// console.log(fatorial(6))

module.exports = fatorial