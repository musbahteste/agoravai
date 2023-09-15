import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarPombo = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const user = await prisma.pombo.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarPombo = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.pombo.findMany()
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarUmPombo = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.pombo.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarPomboDono = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.pombo.findMany({
            where: { dono: Number(dados.id) },
            include: { usuario: true }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}



export const EditarPombo = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.pombo.update({
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

export const DeletarPombo = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.pombo.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}

export const DeletarPomboUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const { id } = request.params
        const user = await prisma.pombo.deleteMany({ where: { dono: Number(id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}