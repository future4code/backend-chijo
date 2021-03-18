const manipulaNumeros = (num1: number, num2: number): void => {
    console.log("Soma:", num1 + num2)
    console.log("Subtração:", num1 - num2)
    console.log("Multiplicação:", num1 * num2)
    console.log("Maior:", num1 >= num2 ? num1 : num2)
}

manipulaNumeros(5,10)