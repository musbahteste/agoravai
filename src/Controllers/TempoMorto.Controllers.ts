import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient()

export const SalvarTempoMorto = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const data = request.body

        const tempo = await prisma.tempo_morto.create({
            data: data
        })

        await prisma.$disconnect()
        return response.json(tempo)

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarTempoProva = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const prova = request.params

        const tempo = await prisma.tempo_morto.findMany({
            where: {
                prova_id: Number(prova.id)
            }
        })

        await prisma.$disconnect()
        return response.json(tempo)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const EditarTempoMorto = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const prova = request.params
        const data = request.body
        const tempo = await prisma.tempo_morto.update({
            where: {
                id: Number(prova.id)
            },
            data: data
        })

        await prisma.$disconnect()
        return response.json(tempo)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const DeleteTempoMorto = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const prova = request.params

        const tempo = await prisma.tempo_morto.delete({
            where: {
                id: Number(prova.id)
            }
        })

        await prisma.$disconnect()
        return response.json(tempo)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}