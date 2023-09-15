import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma = new PrismaClient()

export const SalvarUsuario = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()

        const body = request.body
        console.log(body)
        const user = await prisma.usuario.create({ data: body })

        await prisma.$disconnect()
        console.log('passei do $disconnect')
        return response.json(user)


    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.usuario.findMany({

            include: {
                herarquia: true,
                credencial: true,
                socio_clube: {
                    include: {
                        clube: {
                            select: {
                                id: true,
                                nome: true,
                                federacao: true,
                            }
                        }
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

export const BuscarUsuarioGeral = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const user = await prisma.usuario.findMany({
            include: { clube: true, pombo: true }
        })


        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarUmUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params

        const user = await prisma.$queryRaw`SELECT 
        a.id AS id_usuario,
        a.id_cred,
        a.nome,
        a.cpf_cnpj,
        a.telefone,
        a.endereco,
        a.num_endereco,
        a.complemento,
        a.bairro,
        a.cidade,
        a.uf,
        a.cep,
        a.pais,
        a.latitude_pombal,
        a.longitude_pombal, 
        b.situacao,
        b.email,
        b.senha,
        b.prazo_licenca,
        c.id AS id_herarquia,
        c.perfil,
        b.create_at,
	    e.id AS clube_id,
		e.nome AS clube_nome,
		e.usuario_dirigente,
		e.federacao_id,
		f.nome AS federacao_nome,
		f.presidente AS federacao_presidente,
        d.id AS id_socioclube
        FROM usuario a
        LEFT JOIN credencial b ON b.id = a.id_cred
        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred
        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred
        LEFT JOIN clube e ON e.id = d.clube_id
        LEFT JOIN federacao f ON f.id = e.federacao_id
        WHERE e.usuario_dirigente = ${Number(dados.id)}`

        console.log(user)

        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const BuscarUnicoUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params

        const user = await prisma.$queryRaw`SELECT 
        a.id AS id_usuario,
        a.id_cred,
        a.nome,
        a.cpf_cnpj,
        a.telefone,
        a.endereco,
        a.num_endereco,
        a.complemento,
        a.bairro,
        a.cidade,
        a.uf,
        a.cep,
        a.pais,
        a.latitude_pombal,
        a.longitude_pombal, 
        b.situacao,
        b.email,
        b.senha,
        b.prazo_licenca,
        c.id AS id_herarquia,
        c.perfil,
        b.create_at,
	    e.id AS clube_id,
		e.nome AS clube_nome,
		e.usuario_dirigente,
		e.federacao_id,
		f.nome AS federacao_nome,
		f.presidente AS federacao_presidente,
        d.id AS id_socioclube
        FROM usuario a
        LEFT JOIN credencial b ON b.id = a.id_cred
        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred
        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred
        LEFT JOIN clube e ON e.id = d.clube_id
        LEFT JOIN federacao f ON f.id = e.federacao_id
        WHERE a.id_cred = ${Number(dados.id)}`


        await prisma.$disconnect()
        return response.json(user)

    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const EditarUsuario = async (request: Request, response: Response) => {
    try {
        await prisma.$connect()
        const { id } = request.params
        const body = request.body

        const user = await prisma.usuario.update({
            where: { id_cred: Number(id) },
            data: body,
        })
        await prisma.$disconnect()
        return response.json(user)
    } catch (error) {
        await prisma.$disconnect()
        return console.log(error)
    }
}

export const DeletarUsuario = async (request: Request, response: Response) => {

    try {
        await prisma.$connect()
        const dados = request.params
        const user = await prisma.usuario.delete({ where: { id: Number(dados.id) } })
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