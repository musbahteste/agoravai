import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

interface FilePath {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number,
}

export const SalvarDocumento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const data = request.body
        const file = request.file as FilePath

        console.log(data)

        const documento = await prisma.documentos.create({
            data: {
                descricao: data.descricao,
                usuario_id: Number(data.usuario_id),
                vencimento: data.vencimento === 'null' ? null : data.vencimento,
                clube_id: data.clube_id === 'null' ? null : Number(data.clube_id),
                tipo_documento: data.tipo_documento,
                url: file?.path
            }
        })

        await prisma.$disconnect()
        return response.json(documento)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarDocumento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const id = request.params
        const doc = await prisma.documentos.findMany({
            where: {
                usuario_id: Number(id.id)
            }
        })

        await prisma.$disconnect()
        return response.json(doc)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarTodosDocumento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const doc = await prisma.documentos.findMany({
            include: {
                clube: true
            }
        })

        await prisma.$disconnect()
        return response.json(doc)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const BuscarClubeDocumento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const id = request.params
        const doc = await prisma.documentos.findMany({
            where: {
                clube_id: Number(id.id),
            }
        })

        await prisma.$disconnect()
        return response.json(doc)
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

export const DownloadDocumento = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const id = request.params
        const doc = await prisma.documentos.findUnique({
            where: {
                id: Number(id.id)
            }
        })

        await prisma.$disconnect()
        return response.download(String(doc?.url))
    } catch (error) {
        console.log(error)
        await prisma.$disconnect()
        return response.json(error)
    }
}

