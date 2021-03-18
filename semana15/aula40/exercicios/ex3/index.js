//Crie uma aplicação Node que receba uma string representando
// uma tarefa. O programa deve adicionar a nova tarefa em uma
// variável que represente uma lista de tarefas. A lista de
// tarefas pode estar criada antes da execução do código.
// Após adicionar o item à lista, exiba a lista atualizada.

var fs = require('fs');

const listaEmTexto = fs.readFileSync('./tarefas.txt').toString()
const listaArray = listaEmTexto.split("\n")

const novaTarefa = process.argv[2]
listaArray.push(novaTarefa)

const novaListaEmTexto = listaEmTexto + "\n" + novaTarefa

fs.writeFile("./tarefas.txt", novaListaEmTexto , () => {
    console.table(listaArray)
})
