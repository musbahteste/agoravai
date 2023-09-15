import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient()

export const ResultadoProva = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const prova = request.params
        const dados = await prisma.provas_lancamento.findMany({
            where: { prova_id: Number(prova.id) },
            select: {
                id: true,
                prova_id: true,
                pombo_id: true,
                data_hora_chegada: true,
                latitude_chegada: true,
                longitude_chegada: true,
                usuario_id: true,
                prova: {
                    select: {
                        data_hora_solta: true,
                        latitude_solta: true,
                        longitude_solta: true,
                    }
                }
            }
        })

        let timeDead = 0

        const tempoMorto = await prisma.tempo_morto.findMany({
            where: { prova_id: Number(prova.id) }
        })

        if (tempoMorto.length > 0) {
            for (let i = 0; i < tempoMorto.length; i++) {
                let timeInitial = new Date(tempoMorto[i].tempo_morto_inicio).getTime()
                let timeEnd = new Date(tempoMorto[i].tempo_morto_final).getTime()

                let result = timeInitial - timeEnd

                timeDead = timeDead + result
            }
        }

        for (let i = 0; i < dados.length; i++) {

            const c1 = (Number(dados[i].prova.latitude_solta) - Number(dados[i].latitude_chegada)) ** 2 + (Number(dados[i].prova.longitude_solta) - Number(dados[i].longitude_chegada)) ** 2
            const c2 = Math.sqrt(c1) * 111.195 * 1000

            const data1 = new Date(String(dados[i].prova.data_hora_solta)).getTime()
            const data2 = new Date(dados[i].data_hora_chegada).getTime()
            const tempo = Math.abs(data2 - data1 - timeDead) / (1000 * 3600 / 60)

            const velocidade = Number((c2 / tempo).toFixed(3))

            await prisma.provas_resultado.create({
                data: {
                    prova_id: dados[i].prova_id,
                    prova_lanc_id: dados[i].id,
                    pombo_id: dados[i].pombo_id,
                    distancia_percorrida: c2,
                    tempo_prova: tempo,
                    velocidade_media: velocidade,
                }
            })

        }

        let list = await prisma.provas_resultado.findMany({
            orderBy: { velocidade_media: 'desc' }
        })

        for (let i = 0; i < list.length; i++) {
            let p = 300 - i
            let v = i + 1
            await prisma.provas_resultado.update({
                where: { id: list[i].id },
                data: {
                    posicao: v,
                    pts: p <= 0 ? 0 : p
                }
            })
        }

        await prisma.provas.update({
            where: { id: Number(prova.id) },
            data: { prova_encerrada: true, }
        })

        const final = await prisma.provas_resultado.findMany({
            where: { prova_id: Number(prova.id) },
            orderBy: { posicao: 'asc' }
        })

        await prisma.$disconnect()
        return response.json(final)
    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const ResultadoProvaLista = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.provas_resultado.findMany({
            where: {
                prova_id: Number(dados.id)
            },
            include: {
                prova: true,
                pombo: {
                    select: {
                        anilha: true,
                        usuario: { select: { nome: true, } }
                    },
                },
                prova_lancamento: true,
            }
        })

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

