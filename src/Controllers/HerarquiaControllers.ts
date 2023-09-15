import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarHerarquia = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const user = await prisma.herarquia.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarHerarquia = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.herarquia.findMany({ include: { usuario: true } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarUmHerarquia = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.herarquia.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarHerarquia = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.herarquia.update({
            where: { id: Number(id) },
            data: body,
        })
        await prisma.$disconnect()
        return response.json(user)
    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const DeletarHerarquia = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.herarquia.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}

export const DeletarHerarquiaUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const { id } = request.params
        const user = await prisma.herarquia.deleteMany({ where: { usuario_id: Number(id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}

export const PerfilUsuario = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const id = request.params
        const perfil = await prisma.$queryRaw`SELECT a.perfil FROM herarquia a INNER JOIN usuario b ON b.id_cred = a.usuario_id WHERE b.id_cred = ${Number(id.id)};`;

        await prisma.$disconnect()
        return response.json(perfil)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}