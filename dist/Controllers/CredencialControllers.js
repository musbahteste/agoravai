"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.DeletarCredencial = exports.EditarCredencial = exports.Autenticar = exports.BuscarUmCredencial = exports.BuscarCredencial = exports.SalvarCredencial = void 0;
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authConfig = require('../config/auth.json');
var prisma = new client_1.PrismaClient();
var SalvarCredencial = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, usuario, token, userCompleto, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                body = request.body;
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.credencial.create({ data: { email: body.email, senha: body.senha } })];
            case 2:
                user = _a.sent();
                console.log(user);
                return [4 /*yield*/, prisma.credencial.findUnique({ where: { email: String(user.email) } })];
            case 3:
                usuario = _a.sent();
                console.log(usuario);
                if (!usuario) {
                    return [2 /*return*/, response.json({ error: 'Email incorreto, verificar email', code: 'email' })];
                }
                if (!usuario.senha === body.senha) {
                    return [2 /*return*/, response.json({ error: 'Senha está incorreta, verificar email', code: 'senha' })];
                }
                token = jsonwebtoken_1["default"].sign({ id: usuario.id }, authConfig.secret, { expiresIn: 86400 });
                return [4 /*yield*/, prisma.credencial.update({ where: { id: usuario.id }, data: { token: token } })];
            case 4:
                _a.sent();
                return [4 /*yield*/, prisma.credencial.findUnique({ where: { id: usuario.id } })];
            case 5:
                userCompleto = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 6:
                _a.sent();
                return [2 /*return*/, response.json(userCompleto)];
            case 7:
                error_1 = _a.sent();
                return [2 /*return*/, console.log(error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.SalvarCredencial = SalvarCredencial;
var BuscarCredencial = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.credencial.findMany()];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, console.log(error_2)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.BuscarCredencial = BuscarCredencial;
var BuscarUmCredencial = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.credencial.findUnique({
                        where: { id: Number(dados.id) }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, console.log(error_3)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.BuscarUmCredencial = BuscarUmCredencial;
var Autenticar = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, senha, user, token, usuario, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 8]);
                email = request.query.email;
                senha = request.query.senha;
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.credencial.findUnique({ where: { email: String(email) } })];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, response.json({ error: 'Email incorreto, verificar email', code: 'email' })];
                }
                if (user.senha !== senha) {
                    return [2 /*return*/, response.json({ error: 'Senha está incorreta, verificar senha', code: 'senha' })];
                }
                token = jsonwebtoken_1["default"].sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });
                return [4 /*yield*/, prisma.credencial.update({ where: { id: user.id }, data: { token: token } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, prisma.usuario.findFirst({
                        where: {
                            id_cred: user.id
                        }
                    })];
            case 4:
                usuario = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                console.log({ id: user.id, email: user.email, token: user.token, situacao: user.situacao, nome: usuario === null || usuario === void 0 ? void 0 : usuario.nome });
                return [2 /*return*/, response.json({ id: user.id, email: user.email, token: user.token, situacao: user.situacao, nome: usuario === null || usuario === void 0 ? void 0 : usuario.nome })];
            case 6:
                error_4 = _a.sent();
                console.log(error_4);
                return [4 /*yield*/, prisma.$disconnect()];
            case 7:
                _a.sent();
                return [2 /*return*/, response.json(error_4)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.Autenticar = Autenticar;
var EditarCredencial = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = request.params.id;
                body = request.body;
                console.log(body, id);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.credencial.update({
                        where: { id: Number(id) },
                        data: body
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_5 = _a.sent();
                return [2 /*return*/, console.log(error_5)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.EditarCredencial = EditarCredencial;
var DeletarCredencial = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.credencial["delete"]({ where: { id: Number(dados.id) } })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 4:
                error_6 = _a.sent();
                console.log(error_6);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_6)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.DeletarCredencial = DeletarCredencial;
//# sourceMappingURL=CredencialControllers.js.map