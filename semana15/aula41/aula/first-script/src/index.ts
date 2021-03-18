// Exercício 1
console.log("Olá, mundo")

// Exercício 2 => criar tsconfig.json

// Exercício 3 => Tipo carro e criar 2 carros e garagem
type carro = {
    marca: string,
    volumeTanque: number,
    temMotorFlex: boolean,
    temAirBag?: boolean
}

const mustang: carro = {
    marca: "Ford",
    volumeTanque: 61,
    temMotorFlex: false
}

const gol: carro = {
    marca: "Volkswagen",
    volumeTanque: 55,
    temMotorFlex: true,
    temAirBag: true
}

const garagem: carro[] = [mustang, gol]

// Exercício 4 => tipar função
function buscarCarrosPorMarca(frota: carro[], marca?: string): carro | carro[]{
    if (marca === undefined) return frota
    return frota.filter(carro => {
        return carro.marca === marca
    })
}

const res: carro | carro[] = buscarCarrosPorMarca(garagem)
console.log(res)

// Exercício 5 => adicionar função no carro
type carro2 = {
    marca: string,
    volumeTanque: number,
    temMotorFlex: boolean,
    temAirBag?: boolean,
    calculaAutonomia: (combustivel: number) => number
}

const fusca: carro2 = {
    marca: "Volkswagen",
    volumeTanque: 20,
    temMotorFlex: false,
    temAirBag: false,
    calculaAutonomia: (combustivel: number) => { return combustivel*5 }
}

console.log(fusca.calculaAutonomia(20))

// Exercício 6 => Enum de marca de carros
enum marcas {
    VOLKSWAGEN = "Volkswagen",
    FORD = "Ford",
    CHEVROLET = "Chevrolet"
}

type carro3 = {
    marca: marcas,
    volumeTanque: number,
    temMotorFlex: boolean,
    temAirBag?: boolean,
    calculaAutonomia: (combustivel: number) => number
}

const fusca2: carro3 = {
    marca: marcas.VOLKSWAGEN,
    volumeTanque: 20,
    temMotorFlex: false,
    temAirBag: false,
    calculaAutonomia: (combustivel: number) => { return combustivel*5 }
}
