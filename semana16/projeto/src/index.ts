import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import knex from "knex"
import { AddressInfo } from 'net'
import { Request, Response } from "express"
import { Task, User, StatusEnum } from "./types"
import { generateUUID, dateToDB, DBToDate, hasParameter, hasResult } from './utils'
import { getErrorCode, setErrorCode } from './utils'

// ---- CONFIGS -------------------------------------------------------------
const app: Express = express()

app.use(express.json())
app.use(cors())
dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env

const connection = knex({
    client: "mysql",
    connection: {
        host: DB_HOST,
        port: Number(DB_PORT || "3306"),
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
})

// ---- DATABASE ------------------------------------------------------------
export const createUserDB = async (user: User): Promise<void> => {
    await connection.insert(user).into("Todo_User")
}

export const editUserDB = async (id: string, name: string, nickname: string): Promise<void> => {
    await connection("Todo_User").update({ "name": name, "nickname": nickname }).where("id", id)
}

export const deleteUserDB = async (userId: string): Promise<void> => {
    // Deletando responsabilidades do usuário
    await connection("Todo_Task_Responsible").delete().where("responsible_user_id", userId)

    // Deletando responsáveis de tasks criadas pelo usuário
    const tasksToDelete = await connection.select("id").from("Todo_Task").where("creator_user_id", userId)
    tasksToDelete.forEach(async (task: any) => {
        await connection("Todo_Task_Responsible").delete().where("task_id", task.id)
    })

    // Deletando tasks criadas pelo usuário
    await connection("Todo_Task").delete().where("creator_user_id", userId)

    // Deletando usuário
    await connection("Todo_User").delete().where("id", userId)
}

export const getUserByIdDB = async (id: string): Promise<any> => {
    const result = await connection
        .select("id", "nickname")
        .from("Todo_User")
        .where("id", id)

    return result
}

export const getAllUsersDB = async (): Promise<any> => {
    const result = await connection.select("id", "nickname").from("Todo_User")
    return result
}

export const searchUserDB = async (query: string): Promise<any> => {
    const result = await connection
        .select("*")
        .from("Todo_User")
        .where("email", "like", `%${query}%`)
        .orWhere("nickname", "like", `%${query}%`)
    return result
}

export const createTaskDB = async (task: Task): Promise<void> => {
    await connection.insert(task).into("Todo_Task")
}

export const deleteTaskDB = async (id: string): Promise<void> => {
    await connection("Todo_Task_Responsible").where("task_id", id).delete()
    await connection("Todo_Task").where("id", id).delete()
}

export const changeTaskStatusDB = async (taskIds: string[], newStatus: StatusEnum): Promise<void> => {
    taskIds.forEach(async (taskId) => {
        await connection("Todo_Task").update({ "status": newStatus }).where("id", taskId)
    })
}

export const getTaskByIdDB = async (id: string): Promise<any> => {
    const result = await connection
        .select("Todo_Task.id as taskId", "title", "description", "limit_date", "status", "creator_user_id", "Todo_User.nickname")
        .from("Todo_Task")
        .where("Todo_Task.id", id)
        .join('Todo_User', 'Todo_User.id', 'creator_user_id')
    return result
}

export const getTasksByUserDB = async (id: string): Promise<any> => {
    const result = await connection
        .select("Todo_Task.id", "title", "description", "limit_date", "status", "creator_user_id", "Todo_User.nickname")
        .from("Todo_Task")
        .where("creator_user_id", id)
        .join('Todo_User', 'Todo_User.id', 'creator_user_id')
    return result
}

export const getTasksByStatusDB = async (status: string): Promise<any> => {
    const result = await connection.select("*").from("Todo_Task").where("status", status)
    return result
}

export const getDelayedTasksDB = async (): Promise<any> => {
    const today = new Date()
    const response = await connection.select("*").from("Todo_Task")
        .whereNot("status", "done")
        .andWhere("limit_date", "<", today)

    return response
}

export const searchTaskDB = async (query: string): Promise<any> => {
    const result = await connection.select("*").from("Todo_Task")
        .where("title", "like", `%${query}%`)
        .orWhere("description", "like", `%${query}%`)

    return result
}

export const attributeTaskDB = async (taskId: string, responsibleUsers: string[]): Promise<void> => {
    responsibleUsers.forEach(async (user) => {
        await connection.insert({ "task_id": taskId, "responsible_user_id": user }).into("Todo_Task_Responsible")
    })

}

export const removeResponsibleUserDB = async (taskId: string, userId: string): Promise<void> => {
    await connection("Todo_Task_Responsible").where("task_id", taskId).andWhere("responsible_user_id", userId).delete()
}

export const getTaskResponsibleUsersDB = async (taskId: string): Promise<any> => {
    const result = await connection
        .select("Todo_User.id", "Todo_User.nickname")
        .from("Todo_User")
        .join("Todo_Task_Responsible", "Todo_User.id", "responsible_user_id")
        .join("Todo_Task", "Todo_Task.id", "task_id")
        .where("Todo_Task.id", taskId)
    return result
}

// ---- ENDPOINTS -----------------------------------------------------------
// Create user (1)
app.put("/user", async (req: Request, res: Response) => {
    try {
        const id = generateUUID()
        const { name, nickname, email } = req.body
        hasParameter(name, "o nome")
        hasParameter(nickname, "o apelido")
        hasParameter(email, "o e-mail")

        const user: User = { id, name, nickname, email }
        await createUserDB(user)
        res.status(200).send({ message: `Usuário ${name} criado com sucesso`, user })

    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Edit User (3)
app.post("/user/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, nickname } = req.body
        hasParameter(name, "o nome")
        hasParameter(nickname, "o apelido")
        hasParameter(id, "o id")

        await editUserDB(id, name, nickname)
        res.status(200).send({ message: `O usuário foi alterado com sucesso`, userId: id })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Delete User (20)
app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        hasParameter(id, "o id")
        deleteUserDB(id)
        res.status(200).send({ message: "Usuário excluído com sucesso", userId: id })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Search User (8)
app.get("/user", async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string
        hasParameter(query, "o parâmetro de busca")
        const result = await searchUserDB(query)
        hasResult(result)
        res.status(200).send({ message: "Busca realizada com sucesso!", users: result })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get All users (6)
app.get("/user/all", async (req: Request, res: Response) => {
    try {
        const result = await getAllUsersDB()
        hasResult(result)
        res.status(200).send({ message: "Usuários pegos com sucesso!", users: result })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get User By Id (2)
app.get("/user/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        hasParameter(id, "o id")
        const result = await getUserByIdDB(id)
        hasResult(result)
        res.status(200).send({ message: "Usuário pego com sucesso!", user: result[0] })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})


// Create Task (4)
app.put("/task", async (req: Request, res: Response) => {
    try {
        const id = generateUUID()
        const { title, description, limitDate, creatorUserId } = req.body
        hasParameter(title, "o título")
        hasParameter(description, "a descrição")
        hasParameter(limitDate, "a data limite")
        hasParameter(creatorUserId, "o id do criador")

        const task: Task = { id, title, description, limit_date: dateToDB(limitDate), creator_user_id: creatorUserId }
        await createTaskDB(task)
        res.status(200).send({ message: `A tarefa "${title}" foi criada com sucesso`, task })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Attribute Responsible to Task (9, 16)
app.post("/task/responsible", async (req: Request, res: Response) => {
    try {
        const { task_id, responsible_user_ids } = req.body
        hasParameter(task_id, "o id da tarefa")
        if (responsible_user_ids.length < 1) {
            setErrorCode(422)
            throw new Error("É necessário passar pelo menos um usuário responsável")
        }

        await attributeTaskDB(task_id, responsible_user_ids)
        res.status(200).send({ message: "Tarefa atribuída com sucesso!" })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Change Task Status (12, 18)
app.post("/task/status/edit", async (req: Request, res: Response) => {
    try {
        const { status, task_ids } = req.body
        hasParameter(status, "o status da tarefa")
        if (task_ids.length < 1) {
            setErrorCode(422)
            throw new Error("É necessário passar pelo menos um usuário responsável")
        }

        await changeTaskStatusDB(task_ids, status)
        res.status(200).send({ message: "Tarefas atualizadas com sucesso!" })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Delete Task (19)
app.delete("/task/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        hasParameter(id, "o id")
        deleteTaskDB(id)
        res.status(200).send({ message: "Tarefa excluída com sucesso" })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Remove Responsible User (15)
app.delete("/task/:taskId/responsible/:responsibleUserId", async (req: Request, res: Response) => {
    try {
        const { taskId, responsibleUserId } = req.params
        hasParameter(taskId, "o id da tarefa")
        hasParameter(responsibleUserId, "o id do usuário")
        removeResponsibleUserDB(taskId, responsibleUserId)
        res.status(200).send({ message: "Responsável removido com sucesso!" })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get Task By UserId (7) or by Status (13) or Search (17)
app.get("/task", async (req: Request, res: Response) => {
    try {
        const { creatorUserId, status, query } = req.query
        if (!creatorUserId && !status && !query) {
            setErrorCode(422)
            throw new Error(`Você deve escolher um parâmetro de busca (creatorUserId, status ou query)`)
        } else if (creatorUserId && status && query) {
            setErrorCode(422)
            throw new Error(`Você deve escolher apenas um parâmetro de busca de cada vez (creatorUserId, status ou query)`)
        }

        let result

        if (creatorUserId) {
            result = await getTasksByUserDB(creatorUserId as string)
        } else if (status) {
            result = await getTasksByStatusDB(status as string)
        } else if (query) {
            result = await searchTaskDB(query as string)
        }

        hasResult(result)

        for (let i = 0; i < result.length; i++){
            const responsible = await getTaskResponsibleUsersDB(result[i].id)
            const newDate = DBToDate(result[i].limit_date)
            result[i] = { ...result[i], limit_date: newDate, responsibleUsers: responsible }
        }

        res.status(200).send({message: "Busca realizada com sucesso", result})
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get Delayed Tasks (14)
app.get("/task/delayed", async (req: Request, res: Response) => {
    try {
        const result = await getDelayedTasksDB()

        for (let i = 0; i < result.length; i++){
            const responsible = await getTaskResponsibleUsersDB(result[i].id)
            const newDate = DBToDate(result[i].limit_date)
            result[i] = { ...result[i], limit_date: newDate, responsibleUsers: responsible }
        }

        res.status(200).send({ message: "Busca realizada com sucesso", tasks: result })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get Task By Id (5, 11)
app.get("/task/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        hasParameter(id, "o id")
        const result = await getTaskByIdDB(id)
        hasResult(result)

        const responsible = await getTaskResponsibleUsersDB(id)
        const newDate = DBToDate(result[0].limit_date)
        const formattedResult = { ...result[0], limit_date: newDate, responsibleUsers: responsible }
        res.status(200).send({ message: "Busca realizada com sucesso", task: formattedResult })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})

// Get Task's Responsible Users (10)
app.get("/task/:id/responsible", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        hasParameter(id, "o id da tarefa")
        const result = await getTaskResponsibleUsersDB(id)
        res.status(200).send({ message: "Busca realizada com sucesso", responsibleUsers: result })
    } catch (err) {
        res.status(getErrorCode()).send({ message: err.message })
    }
})


// ---- SERVER --------------------------------------------------------------
const server = app.listen(PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})