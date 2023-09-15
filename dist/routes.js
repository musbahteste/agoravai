"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var CredencialControllers_1 = require("./Controllers/CredencialControllers");
var HerarquiaControllers_1 = require("./Controllers/HerarquiaControllers");
var UsuarioControllers_1 = require("./Controllers/UsuarioControllers");
var FederacaoControllers_1 = require("./Controllers/FederacaoControllers");
var ClubeControllers_1 = require("./Controllers/ClubeControllers");
var authMiddleware_1 = require("./middleware/authMiddleware");
var SocioClubeControllers_1 = require("./Controllers/SocioClubeControllers");
var CampeonatoControllers_1 = require("./Controllers/CampeonatoControllers");
var ProvaControllers_1 = require("./Controllers/ProvaControllers");
var PomboControllers_1 = require("./Controllers/PomboControllers");
var ClubeCampeonatoControllers_1 = require("./Controllers/ClubeCampeonatoControllers");
var ProvaLancamento_1 = require("./Controllers/ProvaLancamento");
var ResultadoProva_1 = require("./Controllers/ResultadoProva");
var multer_1 = __importDefault(require("multer"));
var multer_2 = require("./config/multer");
var DocumentosControllers_1 = require("./Controllers/DocumentosControllers");
var TempoMorto_Controllers_1 = require("./Controllers/TempoMorto.Controllers");
var EsqueciSenhaControllers_1 = require("./Controllers/EsqueciSenhaControllers");
var routes = (0, express_1.Router)();
routes.get('/', function (req, res) {
    return res.json({ Menssage: "Seja Bem Vindo a API da Oneck Creative ligue para nós para saber mais sobre a API" });
});
//Rota de Usuario
routes.get('/usuario', authMiddleware_1.authMiddleware, UsuarioControllers_1.BuscarUsuario);
routes.get('/usuario/:id', authMiddleware_1.authMiddleware, UsuarioControllers_1.BuscarUmUsuario);
routes.get('/usuario/unico/:id', authMiddleware_1.authMiddleware, UsuarioControllers_1.BuscarUnicoUsuario);
routes.post('/usuario/', authMiddleware_1.authMiddleware, UsuarioControllers_1.SalvarUsuario);
routes.put('/usuario/:id', authMiddleware_1.authMiddleware, UsuarioControllers_1.EditarUsuario);
routes.patch('/usuario/:id', authMiddleware_1.authMiddleware, UsuarioControllers_1.EditarUsuario);
routes["delete"]('/usuario/:id', authMiddleware_1.authMiddleware, UsuarioControllers_1.DeletarUsuario);
routes.get('/listageralusuario', authMiddleware_1.authMiddleware, UsuarioControllers_1.BuscarUsuarioGeral);
//Rota de Credenciais
routes.post('/credencial', CredencialControllers_1.SalvarCredencial);
routes.get('/credencial', authMiddleware_1.authMiddleware, CredencialControllers_1.BuscarCredencial);
routes.get('/credencial/:id', authMiddleware_1.authMiddleware, CredencialControllers_1.BuscarUmCredencial);
routes.put('/credencial/:id', authMiddleware_1.authMiddleware, CredencialControllers_1.EditarCredencial);
routes.patch('/credencial/:id', authMiddleware_1.authMiddleware, CredencialControllers_1.EditarCredencial);
routes["delete"]('/credencial/:id', authMiddleware_1.authMiddleware, CredencialControllers_1.DeletarCredencial);
routes.get('/autenticar', CredencialControllers_1.Autenticar);
//Rota da Herarquia
routes.post('/herarquia', authMiddleware_1.authMiddleware, HerarquiaControllers_1.SalvarHerarquia);
routes.get('/herarquia', authMiddleware_1.authMiddleware, HerarquiaControllers_1.BuscarHerarquia);
routes.get('/herarquia/perfil/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.PerfilUsuario);
routes.get('/herarquia/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.BuscarUmHerarquia);
routes.put('/herarquia/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.EditarHerarquia);
routes.patch('/herarquia/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.EditarHerarquia);
routes["delete"]('/herarquia/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.DeletarHerarquia);
routes["delete"]('/herarquia/user/:id', authMiddleware_1.authMiddleware, HerarquiaControllers_1.DeletarHerarquiaUsuario);
//Rota da Socio Clube
routes.post('/socioclube', authMiddleware_1.authMiddleware, SocioClubeControllers_1.SalvarSocioClube);
routes.get('/socioclube', authMiddleware_1.authMiddleware, SocioClubeControllers_1.BuscarSocioClube);
routes.get('/socioclube/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.BuscarUmSocioClube);
routes.put('/socioclube/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.EditarSocioClube);
routes.patch('/socioclube/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.EditarSocioClube);
routes["delete"]('/socioclube/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.DeletarSocioClube);
routes.get('/socioclube/socio/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.BuscarClubeSocio);
routes["delete"]('/socioclube/user/:id', authMiddleware_1.authMiddleware, SocioClubeControllers_1.DeletarSocioClubeUsuario);
//Rota Federação
routes.get('/federacao', authMiddleware_1.authMiddleware, FederacaoControllers_1.BuscarFederacao);
routes.get('/federacao/:id', authMiddleware_1.authMiddleware, FederacaoControllers_1.BuscarUmFederacao);
routes.post('/federacao', authMiddleware_1.authMiddleware, FederacaoControllers_1.SalvarFederacao);
routes.put('/federacao/:id', authMiddleware_1.authMiddleware, FederacaoControllers_1.EditarFederacao);
routes.patch('/federacao/:id', authMiddleware_1.authMiddleware, FederacaoControllers_1.EditarFederacao);
routes["delete"]('/federacao/:id', authMiddleware_1.authMiddleware, FederacaoControllers_1.DeletarFederacao);
//Rota Campeonato
routes.get('/campeonato', authMiddleware_1.authMiddleware, CampeonatoControllers_1.BuscarCampeonato);
routes.get('/campeonato/:id', authMiddleware_1.authMiddleware, CampeonatoControllers_1.BuscarUmCampeonato);
routes.get('/campeonato/clube/:id', authMiddleware_1.authMiddleware, CampeonatoControllers_1.BuscarCampeonatoClube);
routes.post('/campeonato', authMiddleware_1.authMiddleware, CampeonatoControllers_1.SalvarCampeonato);
routes.put('/campeonato/:id', authMiddleware_1.authMiddleware, CampeonatoControllers_1.EditarCampeonato);
routes.patch('/campeonato/:id', authMiddleware_1.authMiddleware, CampeonatoControllers_1.EditarCampeonato);
routes["delete"]('/campeonato/:id', authMiddleware_1.authMiddleware, CampeonatoControllers_1.DeletarCampeonato);
routes.get('/campeonato-presidente', authMiddleware_1.authMiddleware, CampeonatoControllers_1.BuscarCampeonatoPresidente);
//Rota Provas
routes.get('/provas', authMiddleware_1.authMiddleware, ProvaControllers_1.BuscarProva);
routes.get('/provas/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.BuscarUmProva);
routes.get('/provas/clube/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.BuscarProvaClube);
routes.get('/provas/clube/encerradas/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.BuscarProvaClubeEncerradas);
routes.get('/provas/campeonato/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.ProvaPorCampeonato);
routes.post('/provas', authMiddleware_1.authMiddleware, ProvaControllers_1.SalvarProva);
routes.put('/provas/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.EditarProva);
routes.patch('/provas/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.EditarProva);
routes["delete"]('/provas/:id', authMiddleware_1.authMiddleware, ProvaControllers_1.DeletarProva);
//Rota Clube
routes.get('/clube', authMiddleware_1.authMiddleware, ClubeControllers_1.BuscarClube);
routes.get('/clube/:id', authMiddleware_1.authMiddleware, ClubeControllers_1.BuscarUmClube);
routes.post('/clube', authMiddleware_1.authMiddleware, ClubeControllers_1.SalvarClube);
routes.put('/clube/:id', authMiddleware_1.authMiddleware, ClubeControllers_1.EditarClube);
routes.patch('/clube/:id', authMiddleware_1.authMiddleware, ClubeControllers_1.EditarClube);
routes["delete"]('/clube/:id', authMiddleware_1.authMiddleware, ClubeControllers_1.DeletarClube);
routes.get('/clube/dirigente/:id', authMiddleware_1.authMiddleware, ClubeControllers_1.BuscarDirigenteClube);
//Rota Pombo
routes.get('/pombo', authMiddleware_1.authMiddleware, PomboControllers_1.BuscarPombo);
routes.get('/pombo/:id', authMiddleware_1.authMiddleware, PomboControllers_1.BuscarUmPombo);
routes.post('/pombo', authMiddleware_1.authMiddleware, PomboControllers_1.SalvarPombo);
routes.put('/pombo/:id', authMiddleware_1.authMiddleware, PomboControllers_1.EditarPombo);
routes.patch('/pombo/:id', authMiddleware_1.authMiddleware, PomboControllers_1.EditarPombo);
routes["delete"]('/pombo/:id', authMiddleware_1.authMiddleware, PomboControllers_1.DeletarPombo);
routes["delete"]('/pombo/user/:id', authMiddleware_1.authMiddleware, PomboControllers_1.DeletarPomboUsuario);
routes.get('/pombo/dono/:id', authMiddleware_1.authMiddleware, PomboControllers_1.BuscarPomboDono);
//Rota Clube Campeonato
routes.get('/clube/campeonato', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.BuscarClubeCampionato);
routes.get('/clube/campeonato/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.BuscarUmClubeCampionato);
routes.post('/clube/campeonato', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.SalvarClubeCampionato);
routes.put('/clube/campeonato/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.EditarClubeCampionato);
routes.patch('/clube/campeonato/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.EditarClubeCampionato);
routes["delete"]('/clube/campeonato/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.DeletarClubeCampionato);
routes.get('/clube/campeonato/prova/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.BuscarProvaClubeParticipante);
routes.get('/clube/campeonato/participantes/:id', authMiddleware_1.authMiddleware, ClubeCampeonatoControllers_1.BuscarClubeCampionatoProva);
//Rota Prova Lançamento
routes.get('/provalancamento', authMiddleware_1.authMiddleware, ProvaLancamento_1.BuscarProvaLancamento);
routes.get('/provalancamento/:id', authMiddleware_1.authMiddleware, ProvaLancamento_1.BuscarUmProvaLancamento);
routes.get('/provalancamento/prova/:id', authMiddleware_1.authMiddleware, ProvaLancamento_1.BuscarProvaLancamentoParticipante);
routes.post('/provalancamento', authMiddleware_1.authMiddleware, ProvaLancamento_1.SalvarProvaLancamento);
routes.put('/provalancamento/:id', authMiddleware_1.authMiddleware, ProvaLancamento_1.EditarProvaLancamento);
routes.patch('/provalancamento/:id', authMiddleware_1.authMiddleware, ProvaLancamento_1.EditarProvaLancamento);
routes["delete"]('/provalancamento/:id', authMiddleware_1.authMiddleware, ProvaLancamento_1.DeletarProvaLancamento);
routes.get('/resultadoprova/prova/:id', authMiddleware_1.authMiddleware, ResultadoProva_1.ResultadoProva);
routes.get('/resultadoprova/lista/:id', authMiddleware_1.authMiddleware, ResultadoProva_1.ResultadoProvaLista);
//Rota de Documentos
routes.post('/documento', authMiddleware_1.authMiddleware, (0, multer_1["default"])(multer_2.multerConfig).single("file"), DocumentosControllers_1.SalvarDocumento);
routes.get('/documentos/usuario/:id', authMiddleware_1.authMiddleware, DocumentosControllers_1.BuscarDocumento);
routes.get('/documentos', authMiddleware_1.authMiddleware, DocumentosControllers_1.BuscarTodosDocumento);
routes.get('/download-documento/:id', authMiddleware_1.authMiddleware, DocumentosControllers_1.DownloadDocumento);
routes.get('/documentos/clube/:id', authMiddleware_1.authMiddleware, DocumentosControllers_1.BuscarClubeDocumento);
//Rota do Tempo Morto da provas
routes.get('/tempo-morto/prova/:id', authMiddleware_1.authMiddleware, TempoMorto_Controllers_1.BuscarTempoProva);
routes.put('/tempo-morto/:id', authMiddleware_1.authMiddleware, TempoMorto_Controllers_1.EditarTempoMorto);
routes.post('/tempo-morto', authMiddleware_1.authMiddleware, TempoMorto_Controllers_1.SalvarTempoMorto);
routes["delete"]('/tempo-morto/:id', authMiddleware_1.authMiddleware, TempoMorto_Controllers_1.DeleteTempoMorto);
//Rota Esqueci a senha
routes.post('/esqueci-senha', EsqueciSenhaControllers_1.EsqueciMinhaSenha);
exports["default"] = routes;
//# sourceMappingURL=routes.js.map