import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const authConfig = require('../config/auth.json')

const prisma = new PrismaClient()

export const SalvarCredencial = async (request: Request, response: Response) => {
    try {

        const body = request.body
        await prisma.$connect()
        const user = await prisma.credencial.create({ data: { email: body.email, senha: body.senha, } })
        console.log(user)

        const usuario = await prisma.credencial.findUnique({ where: { email: String(user.email) } })
        console.log(usuario)

        if (!usuario) {
            return response.json({ error: 'Email incorreto, verificar email', code: 'email' })
        }

        if (!usuario.senha === body.senha) {
            return response.json({ error: 'Senha está incorreta, verificar email', code: 'senha' })
        }
        const token = jwt.sign({ id: usuario.id }, authConfig.secret, { expiresIn: 86400, })

        await prisma.credencial.update({ where: { id: usuario.id }, data: { token: token } })

        const userCompleto = await prisma.credencial.findUnique({ where: { id: usuario.id } })

        await prisma.$disconnect()

        return response.json(userCompleto)

    } catch (error) {

        return console.log(error)
    }
}

export const BuscarCredencial = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.credencial.findMany()

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        return console.log(error)
    }
}


export const BuscarUmCredencial = async (request: Request, response: Response) => {

    try {

        await prisma.$connect()
        const dados = request.params
        const user = await prisma.credencial.findUnique({
            where: { id: Number(dados.id) }
        })

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        return console.log(error)
    }
}

export const Autenticar = async (request: Request, response: Response) => {
    try {
        const email = request.query.email
        const senha = request.query.senha
        await prisma.$connect()

        const user = await prisma.credencial.findUnique({ where: { email: String(email) } })

        if (!user) {
            return response.json({ error: 'Email incorreto, verificar email', code: 'email' })
        }

        if (user.senha !== senha) {
            return response.json({ error: 'Senha está incorreta, verificar senha', code: 'senha' })
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400, })

        await prisma.credencial.update({ where: { id: user.id }, data: { token: token } })

        const usuario = await prisma.usuario.findFirst({
            where: {
                id_cred: user.id
            }
        })
        await prisma.$disconnect()

        console.log({ id: user.id, email: user.email, token: user.token, situacao: user.situacao, nome: usuario?.nome })

        return response.json({ id: user.id, email: user.email, token: user.token, situacao: user.situacao, nome: usuario?.nome })
    } catch (error) {
        console.log(error)
        
        await prisma.$disconnect()

        return response.json(error)
    }
}

export const EditarCredencial = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const body = request.body
        console.log(body, id)
        await prisma.$connect()
        const user = await prisma.credencial.update({
            where: { id: Number(id) },
            data: body,
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        return console.log(error)
    }
}

export const DeletarCredencial = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.credencial.delete({ where: { id: Number(dados.id) } })

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        console.log(error)

        await prisma.$disconnect()

        return response.json(error)
    }
}