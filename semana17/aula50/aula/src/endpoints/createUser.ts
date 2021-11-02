import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user } from "../types";
import { transporter } from '../services/mailTransporter';
import { config } from "dotenv"

config()

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, nickname, email, address } = req.body

      if (!name || !nickname || !email || !address) {
         res.statusCode = 422
         throw "'name', 'nickname', 'email' e 'address' são obrigatórios"
      }

      const id: string = Date.now().toString()

      const newUser: user = { id, name, nickname, email, address }

      await connection('aula51_users').insert(newUser)

      await transporter.sendMail({
         from: `<${process.env.NODEMAILER_USER}>`,
         to: email,
         subject: `Finalize o seu cadastro ${nickname}`,
         html:`
            <p>Clique no botão abaixo para confirmar seu endereço de e-mail.</p>
            <button>Verificar</button>
         `,
         text:`
            Clique no link abaixo para confirmar seu endereço de e-mail
            www.link.com.br
         `
      })

      res.status(201).send("Usuário criado!")

   } catch (error) {

      if (typeof error === "string") {

         res.send(error)
      } else {

         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }

   }
}