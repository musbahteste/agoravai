import { Router } from "express";
import { Autenticar, BuscarCredencial, BuscarUmCredencial, DeletarCredencial, EditarCredencial, SalvarCredencial } from "./Controllers/CredencialControllers";
import { BuscarHerarquia, BuscarUmHerarquia, DeletarHerarquia, DeletarHerarquiaUsuario, EditarHerarquia, PerfilUsuario, SalvarHerarquia } from "./Controllers/HerarquiaControllers";
import { BuscarUmUsuario, BuscarUnicoUsuario, BuscarUsuario, BuscarUsuarioGeral, DeletarUsuario, EditarUsuario, SalvarUsuario } from "./Controllers/UsuarioControllers";
import { BuscarFederacao, BuscarUmFederacao, DeletarFederacao, EditarFederacao, SalvarFederacao } from "./Controllers/FederacaoControllers";
import { BuscarUmClube, BuscarClube, DeletarClube, EditarClube, SalvarClube, BuscarDirigenteClube } from "./Controllers/ClubeControllers";
import { authMiddleware } from "./middleware/authMiddleware";
import { BuscarClubeSocio, BuscarSocioClube, BuscarUmSocioClube, DeletarSocioClube, DeletarSocioClubeUsuario, EditarSocioClube, SalvarSocioClube } from "./Controllers/SocioClubeControllers";
import { BuscarCampeonato, BuscarCampeonatoClube, BuscarCampeonatoPresidente, BuscarUmCampeonato, DeletarCampeonato, EditarCampeonato, SalvarCampeonato } from "./Controllers/CampeonatoControllers";
import { BuscarProva, BuscarProvaClube, BuscarProvaClubeEncerradas, BuscarUmProva, DeletarProva, EditarProva, ProvaPorCampeonato, SalvarProva } from "./Controllers/ProvaControllers";
import { BuscarPombo, BuscarPomboDono, BuscarUmPombo, DeletarPombo, DeletarPomboUsuario, EditarPombo, SalvarPombo } from "./Controllers/PomboControllers";
import { BuscarClubeCampionato, BuscarClubeCampionatoProva, BuscarProvaClubeParticipante, BuscarUmClubeCampionato, DeletarClubeCampionato, EditarClubeCampionato, SalvarClubeCampionato } from "./Controllers/ClubeCampeonatoControllers";
import { BuscarProvaLancamento, BuscarProvaLancamentoParticipante, BuscarUmProvaLancamento, DeletarProvaLancamento, EditarProvaLancamento, SalvarProvaLancamento } from "./Controllers/ProvaLancamento";
import { ResultadoProva, ResultadoProvaLista } from "./Controllers/ResultadoProva";
import multer from 'multer'
import { multerConfig } from './config/multer'
import { BuscarClubeDocumento, BuscarDocumento, BuscarTodosDocumento, DownloadDocumento, SalvarDocumento } from "./Controllers/DocumentosControllers";
import { BuscarTempoProva, DeleteTempoMorto, EditarTempoMorto, SalvarTempoMorto } from "./Controllers/TempoMorto.Controllers";
import { EsqueciMinhaSenha } from "./Controllers/EsqueciSenhaControllers";

const routes = Router()

routes.get('/', (req, res) => {
    return res.json({ Menssage: "Seja Bem Vindo a API da Oneck Creative ligue para nós para saber mais sobre a API" })
})

//Rota de Usuario
routes.get('/usuario', authMiddleware, BuscarUsuario)
routes.get('/usuario/:id', authMiddleware, BuscarUmUsuario)
routes.get('/usuario/unico/:id', authMiddleware, BuscarUnicoUsuario)
routes.post('/usuario/', authMiddleware, SalvarUsuario)
routes.put('/usuario/:id', authMiddleware, EditarUsuario)
routes.patch('/usuario/:id', authMiddleware, EditarUsuario)
routes.delete('/usuario/:id', authMiddleware, DeletarUsuario)
routes.get('/listageralusuario', authMiddleware, BuscarUsuarioGeral)

//Rota de Credenciais
routes.post('/credencial', SalvarCredencial)
routes.get('/credencial', authMiddleware, BuscarCredencial)
routes.get('/credencial/:id', authMiddleware, BuscarUmCredencial)
routes.put('/credencial/:id', authMiddleware, EditarCredencial)
routes.patch('/credencial/:id', authMiddleware, EditarCredencial)
routes.delete('/credencial/:id', authMiddleware, DeletarCredencial)
routes.get('/autenticar', Autenticar)

//Rota da Herarquia
routes.post('/herarquia', authMiddleware, SalvarHerarquia)
routes.get('/herarquia', authMiddleware, BuscarHerarquia)
routes.get('/herarquia/perfil/:id', authMiddleware, PerfilUsuario)
routes.get('/herarquia/:id', authMiddleware, BuscarUmHerarquia)
routes.put('/herarquia/:id', authMiddleware, EditarHerarquia)
routes.patch('/herarquia/:id', authMiddleware, EditarHerarquia)
routes.delete('/herarquia/:id', authMiddleware, DeletarHerarquia)
routes.delete('/herarquia/user/:id', authMiddleware, DeletarHerarquiaUsuario)

//Rota da Socio Clube
routes.post('/socioclube', authMiddleware, SalvarSocioClube)
routes.get('/socioclube', authMiddleware, BuscarSocioClube)
routes.get('/socioclube/:id', authMiddleware, BuscarUmSocioClube)
routes.put('/socioclube/:id', authMiddleware, EditarSocioClube)
routes.patch('/socioclube/:id', authMiddleware, EditarSocioClube)
routes.delete('/socioclube/:id', authMiddleware, DeletarSocioClube)
routes.get('/socioclube/socio/:id', authMiddleware, BuscarClubeSocio)
routes.delete('/socioclube/user/:id', authMiddleware, DeletarSocioClubeUsuario)

//Rota Federação
routes.get('/federacao', authMiddleware, BuscarFederacao)
routes.get('/federacao/:id', authMiddleware, BuscarUmFederacao)
routes.post('/federacao', authMiddleware, SalvarFederacao)
routes.put('/federacao/:id', authMiddleware, EditarFederacao)
routes.patch('/federacao/:id', authMiddleware, EditarFederacao)
routes.delete('/federacao/:id', authMiddleware, DeletarFederacao)

//Rota Campeonato
routes.get('/campeonato', authMiddleware, BuscarCampeonato)
routes.get('/campeonato/:id', authMiddleware, BuscarUmCampeonato)
routes.get('/campeonato/clube/:id', authMiddleware, BuscarCampeonatoClube)
routes.post('/campeonato', authMiddleware, SalvarCampeonato)
routes.put('/campeonato/:id', authMiddleware, EditarCampeonato)
routes.patch('/campeonato/:id', authMiddleware, EditarCampeonato)
routes.delete('/campeonato/:id', authMiddleware, DeletarCampeonato)
routes.get('/campeonato-presidente', authMiddleware, BuscarCampeonatoPresidente)

//Rota Provas
routes.get('/provas', authMiddleware, BuscarProva)
routes.get('/provas/:id', authMiddleware, BuscarUmProva)
routes.get('/provas/clube/:id', authMiddleware, BuscarProvaClube)
routes.get('/provas/clube/encerradas/:id', authMiddleware, BuscarProvaClubeEncerradas)
routes.get('/provas/campeonato/:id', authMiddleware, ProvaPorCampeonato)
routes.post('/provas', authMiddleware, SalvarProva)
routes.put('/provas/:id', authMiddleware, EditarProva)
routes.patch('/provas/:id', authMiddleware, EditarProva)
routes.delete('/provas/:id', authMiddleware, DeletarProva)

//Rota Clube
routes.get('/clube', authMiddleware, BuscarClube)
routes.get('/clube/:id', authMiddleware, BuscarUmClube)
routes.post('/clube', authMiddleware, SalvarClube)
routes.put('/clube/:id', authMiddleware, EditarClube)
routes.patch('/clube/:id', authMiddleware, EditarClube)
routes.delete('/clube/:id', authMiddleware, DeletarClube)
routes.get('/clube/dirigente/:id', authMiddleware, BuscarDirigenteClube)

//Rota Pombo
routes.get('/pombo', authMiddleware, BuscarPombo)
routes.get('/pombo/:id', authMiddleware, BuscarUmPombo)
routes.post('/pombo', authMiddleware, SalvarPombo)
routes.put('/pombo/:id', authMiddleware, EditarPombo)
routes.patch('/pombo/:id', authMiddleware, EditarPombo)
routes.delete('/pombo/:id', authMiddleware, DeletarPombo)
routes.delete('/pombo/user/:id', authMiddleware, DeletarPomboUsuario)
routes.get('/pombo/dono/:id', authMiddleware, BuscarPomboDono)

//Rota Clube Campeonato
routes.get('/clube/campeonato', authMiddleware, BuscarClubeCampionato)
routes.get('/clube/campeonato/:id', authMiddleware, BuscarUmClubeCampionato)
routes.post('/clube/campeonato', authMiddleware, SalvarClubeCampionato)
routes.put('/clube/campeonato/:id', authMiddleware, EditarClubeCampionato)
routes.patch('/clube/campeonato/:id', authMiddleware, EditarClubeCampionato)
routes.delete('/clube/campeonato/:id', authMiddleware, DeletarClubeCampionato)
routes.get('/clube/campeonato/prova/:id', authMiddleware, BuscarProvaClubeParticipante)
routes.get('/clube/campeonato/participantes/:id', authMiddleware, BuscarClubeCampionatoProva)

//Rota Prova Lançamento
routes.get('/provalancamento', authMiddleware, BuscarProvaLancamento)
routes.get('/provalancamento/:id', authMiddleware, BuscarUmProvaLancamento)
routes.get('/provalancamento/prova/:id', authMiddleware, BuscarProvaLancamentoParticipante)
routes.post('/provalancamento', authMiddleware, SalvarProvaLancamento)
routes.put('/provalancamento/:id', authMiddleware, EditarProvaLancamento)
routes.patch('/provalancamento/:id', authMiddleware, EditarProvaLancamento)
routes.delete('/provalancamento/:id', authMiddleware, DeletarProvaLancamento)

routes.get('/resultadoprova/prova/:id', authMiddleware, ResultadoProva)
routes.get('/resultadoprova/lista/:id', authMiddleware, ResultadoProvaLista)

//Rota de Documentos
routes.post('/documento', authMiddleware, multer(multerConfig).single("file"), SalvarDocumento)
routes.get('/documentos/usuario/:id', authMiddleware, BuscarDocumento)
routes.get('/documentos', authMiddleware, BuscarTodosDocumento)
routes.get('/download-documento/:id', authMiddleware, DownloadDocumento)
routes.get('/documentos/clube/:id', authMiddleware, BuscarClubeDocumento);

//Rota do Tempo Morto da provas
routes.get('/tempo-morto/prova/:id', authMiddleware, BuscarTempoProva)
routes.put('/tempo-morto/:id', authMiddleware, EditarTempoMorto)
routes.post('/tempo-morto', authMiddleware, SalvarTempoMorto)
routes.delete('/tempo-morto/:id', authMiddleware, DeleteTempoMorto)

//Rota Esqueci a senha
routes.post('/esqueci-senha', EsqueciMinhaSenha)



export default routes