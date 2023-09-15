import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarClubeCampionato = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const user = await prisma.clube_campeonato.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarClubeCampionato = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.clube_campeonato.findMany({
            include: {
                campeonato: true,
                provas: true,
                pombo: true,
                clube: true,
                socio: true,
            }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarClubeCampionatoProva = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dado = request.params
        const user = await prisma.clube_campeonato.findMany({
            where: {
                prova_id: Number(dado.id)
            },
            include: {
                pombo:{
                    select:{
                        anilha: true,
                        cor: true,
                        sexo: true,
                    },
                },
                socio:{
                    select:{
                        nome: true,
                        id: true,
                        id_cred: true,
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

export const BuscarProvaClubeParticipante = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dado = request.params

        const user = await prisma.clube_campeonato.findMany(
            {
                where: { clube_id: Number(dado.id) },
                select: {
                    socio: {
                        select: { id: true, id_cred: true, nome: true, latitude_pombal: true, longitude_pombal: true, }
                    },
                    pombo: {
                        select: { anilha: true, id: true, sexo: true, cor: true, },
                    },
                    campeonato: {
                        select: { id: true, nome: true, situacao: true, }
                    },
                    provas: {
                        select: { id: true, nome: true, situacao: true, cidade: true, uf: true, }
                    },
                    clube: {
                        select: { id: true, nome: true, usuario_dirigente: true, }
                    }
                }
            }
        )
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarUmClubeCampionato = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.clube_campeonato.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarClubeCampionato = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.clube_campeonato.update({
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

export const DeletarClubeCampionato = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.clube_campeonato.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}