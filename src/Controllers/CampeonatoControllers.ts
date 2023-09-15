import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarCampeonato = async (request: Request, response: Response) => {
    try {

        await prisma.$connect()

        const body = request.body
        const user = await prisma.campeonato.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarCampeonato = async (request: Request, response: Response) => {

    try {

        await prisma.$connect()
        const user = await prisma.campeonato.findMany()
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarCampeonatoClube = async (request: Request, response: Response) => {

    try {

        await prisma.$connect()
        const id = request.params
        const user = await prisma.campeonato.findMany({
            where: { clube_id: Number(id.id) },
            include: {
                usuario: {
                    select: { nome: true, }

                },
                clube: {
                    select: {
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


export const BuscarUmCampeonato = async (request: Request, response: Response) => {

    try {

        await prisma.$connect()
        const dados = request.params
        const user = await prisma.campeonato.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarCampeonato = async (request: Request, response: Response) => {
    try {

        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.campeonato.update({
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

export const DeletarCampeonato = async (request: Request, response: Response) => {

    try {

        await prisma.$connect()
        const dados = request.params
        const user = await prisma.campeonato.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarCampeonatoPresidente = async (request: Request, response: Response) => {
    try {

        await prisma.$connect()
        const perfilUser = await prisma.herarquia.findFirst({
            where: { usuario_id: Number(request.userId) }
        });

        console.log(perfilUser)

        if (perfilUser?.perfil === "Admin") {
            const camp = await prisma.campeonato.findMany({
                include: {
                    clube: true,
                    usuario: true,
                    provas: true,
                },
            });

            await prisma.$disconnect()
            return response.json(camp)

        } else {

            await prisma.$disconnect()
            return response.json({
                error: "Usuario não tem permissão para acessar essa informação",
                code: "sem permissao"
            })
        }

    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}