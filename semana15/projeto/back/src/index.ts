import express, { Request, Response } from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

// Types ---------------------------------------------------------------------
type user = {
    name: string,
    cpf: string,
    birthdate: string,
    balance: number,
    statement: transaction[]
}

type transaction = {
    value: number,
    date: string,
    description: string,
    hasBeenDiscounted?: boolean
}

// Global Vars ----------------------------------------------------------------
let users: user[] = [
    {
        name: "Letícia Chijo",
        cpf: "393.050.620-32",
        birthdate: "03/03/1994",
        balance: 1000,
        statement: [
            {
                value: -10,
                date: "09/03/2020",
                description: "Coxinha"
            },
            {
                value: -100,
                date: "10/03/2020",
                description: "Mercado"
            }
        ]
    }
]

let errorCode = 400

// Aux Functions --------------------------------------------------------------

const stringDateToTimestamp = (stringDate: string): number => {
    const date = stringDate.split("/")
    const day = Number(date[0])
    const month = Number(date[1]) - 1
    const year = Number(date[2])
    return new Date(year, month, day).getTime()
}

const timestampToStringDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    let year = String(date.getFullYear())

    if (Number(month) < 10) month = "0" + month
    if (Number(day) < 10) day = "0" + day

    return (day + "/" + month + "/" + year)
}

const verifyCpf = (cpfString: string): void => {
    const cpf = cpfString.replace(/[^\d]+/g, '')
    if (cpf === '') {
        errorCode = 422
        throw new Error("CPF inválido")
    }
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") {
            errorCode = 422
            throw new Error("CPF inválido")
    }

    // Valida 1o digito
    let add = 0
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        errorCode = 422
        throw new Error("CPF inválido")
    }

    // Valida 2o digito
    add = 0
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i)
    }
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
        rev = 0
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        errorCode = 422
        throw new Error("CPF inválido")
    }
}

const verifyUserExistance = (cpf: string): void => {
    const indexUser = users.findIndex((u) => {
        errorCode = 422
        return u.cpf === cpf
    })

    if (indexUser !== -1) {
        errorCode = 409
        throw new Error("Usuário já possui cadastro")
    }
}

const getAge = (birthdate: string): number => {
    const birthTimestamp = stringDateToTimestamp(birthdate)
    const diff = Date.now() - birthTimestamp
    const miliSecondsInAYear = 1000 * 60 * 60 * 24 * 365
    return diff / miliSecondsInAYear
}

const getUser = (cpf: string): user => {
    if (!cpf) {
        errorCode = 422
        throw new Error("Insira um CPF!")
    }

    verifyCpf(cpf)

    const indexUser = users.findIndex((u) => {
        errorCode = 422
        return u.cpf === cpf
    })

    if (indexUser === -1) {
        errorCode = 404
        throw new Error("Usuário não encontrado")
    } else {
        return users[indexUser]
    }
}

const hasEnoughAge = (birthdate: string): void => {
    if (getAge(birthdate) < 18) {
        errorCode = 422
        throw new Error("Somente usuários com mais de 18 anos podem criar uma conta.")
    }
}

const hasParameter = (param: string, paramName: string): void => {
    if (!param) {
        errorCode = 422
        throw new Error(`Preencha ${paramName} corretamente!`)
    }
}

// Endpoints -----------------------------------------------------------------

// createUser
app.post("/user", (req: Request, res: Response) => {
    try {
        hasParameter(req.body.name, "o nome")
        hasParameter(req.body.cpf, "o cpf")
        hasParameter(req.body.birthdate, "a data de nascimento")
        verifyCpf(req.body.cpf)
        verifyUserExistance(req.body.cpf)
        hasEnoughAge(req.body.birthdate)

        const newUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            birthdate: req.body.birthdate,
            balance: 0,
            statement: [] as transaction[]
        }

        users.push(newUser)
        res.status(200).send({ message: "Usuário criado com sucesso!", user: newUser })

    } catch (err) {
        res.status(errorCode).send({message: err.message})
    }
})

// getAllUsers
app.get("/user", (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (err) {
        res.status(errorCode).send({message: err.message})
    }
})

// getUserBalance
app.get("/user/:cpf/balance", (req: Request, res: Response) => {
    try {
        let selectedUser = getUser(req.params.cpf as string)
        res.status(200).send({ cpf: selectedUser.cpf, balance: selectedUser.balance })
    } catch (err) {
        res.status(errorCode).send({message: err.message})
    }
})

// updateBalance
app.put("/user/:cpf/balance", (req: Request, res: Response) => {
    try {
        let selectedUser = getUser(req.params.cpf as string)
        selectedUser.statement.forEach((t: transaction) => {
            if (!t.hasBeenDiscounted){
                selectedUser.balance += t.value
                t.hasBeenDiscounted = true
            }
        })
        res.status(200).send({message: "Saldo atualizado com sucesso!", user: selectedUser})
    } catch(err) {
        res.status(errorCode).send({message: err.message})
    }
})

// transferMoneyToUser
app.put("/user/:cpf/transaction/add", (req: Request, res: Response) => {
    try {
        let selectedUser = getUser(req.params.cpf as string)
        hasParameter(req.body.name, "o nome")
        hasParameter(req.body.value, "o valor da transferência")

        if (req.body.name !== selectedUser.name){
            errorCode = 422
            throw new Error("O nome do usuário não corresponde ao CPF informado!")
        }

        const newTransaction: transaction = {
            value: Number(req.body.value),
            date: timestampToStringDate(Date.now()),
            description: "Depósito de Dinheiro",
            hasBeenDiscounted: true
        }

        selectedUser.balance += Number(req.body.value)
        selectedUser.statement.push(newTransaction)

        res.status(200).send({message: "Transferência realizada com sucesso!", transaction: newTransaction})

    } catch(err) {
        res.status(errorCode).send({message: err.message})
    }
})

// payBill
app.post("/user/:cpf/transaction/sub", (req: Request, res: Response) => {
    try {
        let selectedUser = getUser(req.params.cpf as string)
        let date = req.body.date ? req.body.date : timestampToStringDate(Date.now())

        hasParameter(req.body.value, "o valor da transferência")
        hasParameter(req.body.description, "a descrição da transferência")

        if (req.body.date){
            const timestamp = stringDateToTimestamp(req.body.date)
            if (Date.now() > timestamp){
                errorCode = 422
                throw new Error("A data deve ser igual ou maior ao dia de hoje!")
            }
        }

        if (selectedUser.balance < Number(req.body.value)){
            errorCode = 422
            throw new Error("Você não possui saldo o suficiente")
        }

        const newTransaction: transaction = {
            value: Number(req.body.value)*(-1),
            date: date,
            description: req.body.description
        }

        selectedUser.statement.push(newTransaction)
        res.status(200).send({message: "Transferência realizada com sucesso!", transaction: newTransaction})
    } catch(err) {
        res.status(errorCode).send({message: err.message})
    }
})

// transferToOtherUser
app.post("/user/:cpf/transaction/:accountCpf", (req: Request, res: Response) => {
    try {
        const sendingUser = getUser(req.params.cpf)
        const receivingUser = getUser(req.params.accountCpf)

        hasParameter(req.body.yourName, "o seu nome")
        hasParameter(req.body.recipientName, "o nome da pessoa que receberá a transferência")
        hasParameter(req.body.value, "o valor da transferência")

        if (sendingUser.balance < Number(req.body.value)){
            errorCode = 422
            throw new Error("Você não possui saldo o suficiente")
        }

        if (req.body.yourName !== sendingUser.name){
            errorCode = 422
            throw new Error("Seu nome está incorreto!")
        }

        if (req.body.recipientName !== receivingUser.name){
            errorCode = 422
            throw new Error("O nome do usuário não corresponde ao CPF informado!")
        }

        const newSentTransaction: transaction = {
            value: Number(req.body.value)*(-1),
            date: timestampToStringDate(Date.now()),
            description: `Transferência para ${receivingUser.name}`
        }

        const newReceivedTransaction: transaction = {
            value: Number(req.body.value),
            date: timestampToStringDate(Date.now()),
            description: `Transferência de ${sendingUser.name}`
        }

        sendingUser.statement.push(newSentTransaction)
        receivingUser.statement.push(newReceivedTransaction)

        res.status(200).send({message: "Transferência realizada com sucesso!", transaction: newSentTransaction})
    } catch(err) {
        res.status(errorCode).send({message: err.message})
    }
})

// getUserByCpf
app.get("/user/:cpf", (req: Request, res: Response) => {
    try {
        let selectedUser = getUser(req.params.cpf as string)
        res.status(200).send(selectedUser)
    } catch(err) {
        res.status(errorCode).send({message: err.message})
    }
})


// Server start --------------------------------------------------------------
app.listen(3003, () => {
    console.log("Server running in localhost:3003")
})