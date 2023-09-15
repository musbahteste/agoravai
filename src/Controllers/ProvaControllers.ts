import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarProva = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        console.log(body)
        const user = await prisma.provas.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarProva = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.provas.findMany()
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarProvaClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas.findMany({
            where: {
                campeonato: { clube_id: Number(dados.id) }
            }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarProvaClubeEncerradas = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas.findMany({
            where: {
                prova_encerrada: true,
                campeonato: {
                    clube_id: Number(dados.id),

                }
            }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}



export const ProvaPorCampeonato = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas.findMany({
            where: {
                campeonato_id: Number(dados.id),
            },
            include: {
                campeonato: {
                    select: {
                        nome: true,
                    }
                },
                usuario: {
                    select: {
                        nome: true,

                    }
                }
            }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarUmProva = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas.findUnique({
            where: { id: Number(dados) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarProva = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.provas.update({
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

export const DeletarProva = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}