import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const SalvarSocioClube = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        const user = await prisma.socio_clube.create({ data: body })

        await prisma.$disconnect()
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarSocioClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.socio_clube.findMany()
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const DeletarSocioClubeUsuario = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const { id } = request.params

        const result = await prisma.socio_clube.deleteMany({
            where: {
                usario_id: Number(id)
            }
        })

        await prisma.$disconnect()

        return response.json(result)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()

        return response.json(error)
    }
}

export const BuscarClubeSocio = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dado = request.params
        const user = await prisma.$queryRaw`SELECT * FROM usuario a 
        INNER JOIN socio_clube b ON b.usario_id = a.id_cred
        WHERE b.clube_id = ${Number(dado.id)}`

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}


export const BuscarUmSocioClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.socio_clube.findUnique({
            where: { id: Number(dados.id) }
        })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarSocioClube = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.socio_clube.updateMany({
            where: { usario_id: Number(id) },
            data: body,
        })
        await prisma.$disconnect()
        return response.json(user)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const DeletarSocioClube = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.socio_clube.delete({ where: { id: Number(dados.id) } })
        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {

        await prisma.$disconnect()
        return response.json(error)
    }
}









// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })