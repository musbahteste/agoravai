import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarClube = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const validacao = await prisma.clube.findUnique({ where: { usuario_dirigente: body.usuario_dirigente } })

        if (!validacao?.usuario_dirigente) {
            const user = await prisma.clube.create({ data: body })
            await prisma.$disconnect()
            return response.json(user)
        }

        await prisma.$disconnect()
        return response.json({ message: "O Clube ja Possui esse Dirigente", code: "Diriginte" })


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()

        const user = await prisma.clube.findMany({
            include: {
                federacao: {
                    select: { nome: true }
                },
                usuario: { select: { nome: true } },
            }
        })

        // const user = await prisma.$queryRaw`SELECT a.*, b.nome AS nm_nome_usuario, 
        // c.nome AS nome_federacao FROM clube a 
        // INNER JOIN usuario b ON b.id = a.usuario_dirigente
        // INNER JOIN federacao c ON c.id = a.federacao_id`
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarDirigenteClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.$queryRaw`SELECT a.*, b.nome AS nm_nome_usuario FROM clube a INNER JOIN usuario b ON b.id_cred = a.usuario_dirigente WHERE a.usuario_dirigente = ${Number(dados.id)}`
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}
export const BuscarUmClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.clube.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}



export const EditarClube = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body
        const validacao = await prisma.clube.findUnique({ where: { usuario_dirigente: body.usuario_dirigente } })
        if (validacao?.usuario_dirigente && validacao.id === body.id) {
            const user = await prisma.clube.update({
                where: { id: Number(id) },
                data: body,
            })
            await prisma.$disconnect()
            return response.json(user)
        }
        if (!validacao?.usuario_dirigente) {
            const user = await prisma.clube.update({
                where: { id: Number(id) },
                data: body,
            })
            await prisma.$disconnect()
            return response.json(user)
        }

        await prisma.$disconnect()
        return response.json({ message: "O Clube ja Possui esse Dirigente", code: "Diriginte" });
    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const DeletarClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.clube.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}