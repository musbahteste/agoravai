import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarProvaLancamento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const user = await prisma.provas_lancamento.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarProvaLancamento = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.provas_lancamento.findMany()
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarProvaLancamentoParticipante = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dado = request.params
        const user = await prisma.provas_lancamento.findMany({
            where: {
                prova_id: Number(dado.id)
            },
            include: {
                pombo: {
                    select: {
                        anilha: true,
                        dono: true,
                        cor: true,

                    },
                },
                usuario: {
                    select: {
                        id: true,
                        id_cred: true,
                        nome: true,
                    }
                }
            },
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarUmProvaLancamento = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas_lancamento.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const EditarProvaLancamento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.provas_lancamento.update({
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

export const DeletarProvaLancamento = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas_lancamento.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}