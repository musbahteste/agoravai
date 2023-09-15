"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DeletarUsuario = exports.EditarUsuario = exports.BuscarUnicoUsuario = exports.BuscarUmUsuario = exports.BuscarUsuarioGeral = exports.BuscarUsuario = exports.SalvarUsuario = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var SalvarUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                body = request.body;
                console.log(body);
                return [4 /*yield*/, prisma.usuario.create({ data: body })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                console.log('passei do $disconnect');
                return [2 /*return*/, response.json(user)];
            case 4:
                error_1 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.SalvarUsuario = SalvarUsuario;
var BuscarUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.usuario.findMany({
                        include: {
                            herarquia: true,
                            credencial: true,
                            socio_clube: {
                                include: {
                                    clube: {
                                        select: {
                                            id: true,
                                            nome: true,
                                            federacao: true
                                        }
                                    }
                                }
                            }
                        }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_2 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_2)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarUsuario = BuscarUsuario;
var BuscarUsuarioGeral = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.usuario.findMany({
                        include: { clube: true, pombo: true }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_3 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_3)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarUsuarioGeral = BuscarUsuarioGeral;
var BuscarUmUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT \n        a.id AS id_usuario,\n        a.id_cred,\n        a.nome,\n        a.cpf_cnpj,\n        a.telefone,\n        a.endereco,\n        a.num_endereco,\n        a.complemento,\n        a.bairro,\n        a.cidade,\n        a.uf,\n        a.cep,\n        a.pais,\n        a.latitude_pombal,\n        a.longitude_pombal, \n        b.situacao,\n        b.email,\n        b.senha,\n        b.prazo_licenca,\n        c.id AS id_herarquia,\n        c.perfil,\n        b.create_at,\n\t    e.id AS clube_id,\n\t\te.nome AS clube_nome,\n\t\te.usuario_dirigente,\n\t\te.federacao_id,\n\t\tf.nome AS federacao_nome,\n\t\tf.presidente AS federacao_presidente,\n        d.id AS id_socioclube\n        FROM usuario a\n        LEFT JOIN credencial b ON b.id = a.id_cred\n        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred\n        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred\n        LEFT JOIN clube e ON e.id = d.clube_id\n        LEFT JOIN federacao f ON f.id = e.federacao_id\n        WHERE e.usuario_dirigente = ", ""], ["SELECT \n        a.id AS id_usuario,\n        a.id_cred,\n        a.nome,\n        a.cpf_cnpj,\n        a.telefone,\n        a.endereco,\n        a.num_endereco,\n        a.complemento,\n        a.bairro,\n        a.cidade,\n        a.uf,\n        a.cep,\n        a.pais,\n        a.latitude_pombal,\n        a.longitude_pombal, \n        b.situacao,\n        b.email,\n        b.senha,\n        b.prazo_licenca,\n        c.id AS id_herarquia,\n        c.perfil,\n        b.create_at,\n\t    e.id AS clube_id,\n\t\te.nome AS clube_nome,\n\t\te.usuario_dirigente,\n\t\te.federacao_id,\n\t\tf.nome AS federacao_nome,\n\t\tf.presidente AS federacao_presidente,\n        d.id AS id_socioclube\n        FROM usuario a\n        LEFT JOIN credencial b ON b.id = a.id_cred\n        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred\n        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred\n        LEFT JOIN clube e ON e.id = d.clube_id\n        LEFT JOIN federacao f ON f.id = e.federacao_id\n        WHERE e.usuario_dirigente = ", ""])), Number(dados.id))];
            case 2:
                user = _a.sent();
                console.log(user);
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_4 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_4)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarUmUsuario = BuscarUmUsuario;
var BuscarUnicoUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT \n        a.id AS id_usuario,\n        a.id_cred,\n        a.nome,\n        a.cpf_cnpj,\n        a.telefone,\n        a.endereco,\n        a.num_endereco,\n        a.complemento,\n        a.bairro,\n        a.cidade,\n        a.uf,\n        a.cep,\n        a.pais,\n        a.latitude_pombal,\n        a.longitude_pombal, \n        b.situacao,\n        b.email,\n        b.senha,\n        b.prazo_licenca,\n        c.id AS id_herarquia,\n        c.perfil,\n        b.create_at,\n\t    e.id AS clube_id,\n\t\te.nome AS clube_nome,\n\t\te.usuario_dirigente,\n\t\te.federacao_id,\n\t\tf.nome AS federacao_nome,\n\t\tf.presidente AS federacao_presidente,\n        d.id AS id_socioclube\n        FROM usuario a\n        LEFT JOIN credencial b ON b.id = a.id_cred\n        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred\n        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred\n        LEFT JOIN clube e ON e.id = d.clube_id\n        LEFT JOIN federacao f ON f.id = e.federacao_id\n        WHERE a.id_cred = ", ""], ["SELECT \n        a.id AS id_usuario,\n        a.id_cred,\n        a.nome,\n        a.cpf_cnpj,\n        a.telefone,\n        a.endereco,\n        a.num_endereco,\n        a.complemento,\n        a.bairro,\n        a.cidade,\n        a.uf,\n        a.cep,\n        a.pais,\n        a.latitude_pombal,\n        a.longitude_pombal, \n        b.situacao,\n        b.email,\n        b.senha,\n        b.prazo_licenca,\n        c.id AS id_herarquia,\n        c.perfil,\n        b.create_at,\n\t    e.id AS clube_id,\n\t\te.nome AS clube_nome,\n\t\te.usuario_dirigente,\n\t\te.federacao_id,\n\t\tf.nome AS federacao_nome,\n\t\tf.presidente AS federacao_presidente,\n        d.id AS id_socioclube\n        FROM usuario a\n        LEFT JOIN credencial b ON b.id = a.id_cred\n        LEFT JOIN herarquia c ON c.usuario_id = a.id_cred\n        LEFT JOIN socio_clube d ON d.usario_id = a.id_cred\n        LEFT JOIN clube e ON e.id = d.clube_id\n        LEFT JOIN federacao f ON f.id = e.federacao_id\n        WHERE a.id_cred = ", ""])), Number(dados.id))];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_5 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_5)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarUnicoUsuario = BuscarUnicoUsuario;
var EditarUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                id = request.params.id;
                body = request.body;
                return [4 /*yield*/, prisma.usuario.update({
                        where: { id_cred: Number(id) },
                        data: body
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_6 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_6)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.EditarUsuario = EditarUsuario;
var DeletarUsuario = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.usuario["delete"]({ where: { id: Number(dados.id) } })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_7 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_7)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.DeletarUsuario = DeletarUsuario;
var templateObject_1, templateObject_2;
// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
//# sourceMappingURL=UsuarioControllers.js.map