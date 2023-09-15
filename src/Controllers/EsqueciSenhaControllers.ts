import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient;

export const EsqueciMinhaSenha = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const email = request.body

        const user = await prisma.credencial.findUnique({
            where: {
                email: email.email
            }
        })

        if (user?.situacao) {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fcb.suporte@gmail.com',
                    pass: 'fcbnescafe'
                }
            });

            const senhaTemp = Math.floor(Math.random() * 999999 + 100000)

            const mailOptions = {
                from: 'fcb.suporte@gmail.com',
                to: `${user.email}`,
                subject: 'Recuperação de Senha App FCB',
                text: `Olá, tudo bem? Vamos direto ao ponto sua senha é: ${senhaTemp}`
            };

            const senhaBcrypt = bcrypt.hashSync(String(senhaTemp), 10)

            await prisma.credencial.update({
                where: {
                    id: user.id
                },
                data: {
                    senha: senhaBcrypt
                }
            })

            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log(error);
                    await prisma.$disconnect()
                    return response.json({ error })
                } else {
                    await prisma.$disconnect()
                    return response.json({ "mensage": "Email Enviado com Sucesso", "code": "sucesso", info })
                }

            })

        } else {
            await prisma.$disconnect()
            return response.json("Email Inativo ou Não consta no banco de dados.")
        }
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json({ error: error })
    }

}