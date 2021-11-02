
import { Request, Response } from 'express'
import { connection } from '../data/connection'
import { fullAddress, user, address } from '../types'
import getAddress from '../services/getAddress'
import { transporter } from '../services/mailTransporter'

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, apelido, email, cep, numero, complemento } = req.body

        if (!nome || !apelido || !cep || !email || !numero) {
            res.statusCode = 422
            throw new Error("Nome, apelido, email, cep e número são obrigatórios")
        }

        const id: string = Date.now().toString()
        const idEndereco: string = Date.now().toString()

        const baseEndereco: address = await getAddress(cep)
        const { logradouro, bairro, cidade, estado } = baseEndereco

        const endereco: fullAddress = {
            id: idEndereco,
            logradouro,
            bairro,
            cidade,
            estado,
            cep,
            numero,
            complemento
        }
        const newUser: user = { id, nome, apelido, email, idEndereco }

        await connection('ex50_enderecos').insert(endereco)
        await connection('ex50_usuarios').insert(newUser)

        await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: `Email exercício 50`,
            html:`
               <p>Uhul olha esse email que daora.</p>
               <p>${logradouro}</p>
            `,
            text:`
                Uhul olha esse email que daora.
                ${logradouro}
            `
         })

        res.status(200).send(newUser)
    } catch (err) {
        res.send(err.message || err.sqlMessage)
    }



}

export default createUser