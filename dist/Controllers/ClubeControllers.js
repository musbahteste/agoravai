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
exports.DeletarClube = exports.EditarClube = exports.BuscarUmClube = exports.BuscarDirigenteClube = exports.BuscarClube = exports.SalvarClube = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var SalvarClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, validacao, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 9]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                body = request.body;
                return [4 /*yield*/, prisma.clube.findUnique({ where: { usuario_dirigente: body.usuario_dirigente } })];
            case 2:
                validacao = _a.sent();
                if (!!(validacao === null || validacao === void 0 ? void 0 : validacao.usuario_dirigente)) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.clube.create({ data: body })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 5: return [4 /*yield*/, prisma.$disconnect()];
            case 6:
                _a.sent();
                return [2 /*return*/, response.json({ message: "O Clube ja Possui esse Dirigente", code: "Diriginte" })];
            case 7:
                error_1 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 8:
                _a.sent();
                return [2 /*return*/, console.log(error_1)];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.SalvarClube = SalvarClube;
var BuscarClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.clube.findMany({
                        include: {
                            federacao: {
                                select: { nome: true }
                            },
                            usuario: { select: { nome: true } }
                        }
                    })
                    // const user = await prisma.$queryRaw`SELECT a.*, b.nome AS nm_nome_usuario, 
                    // c.nome AS nome_federacao FROM clube a 
                    // INNER JOIN usuario b ON b.id = a.usuario_dirigente
                    // INNER JOIN federacao c ON c.id = a.federacao_id`
                ];
            case 2:
                user = _a.sent();
                // const user = await prisma.$queryRaw`SELECT a.*, b.nome AS nm_nome_usuario, 
                // c.nome AS nome_federacao FROM clube a 
                // INNER JOIN usuario b ON b.id = a.usuario_dirigente
                // INNER JOIN federacao c ON c.id = a.federacao_id`
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                // const user = await prisma.$queryRaw`SELECT a.*, b.nome AS nm_nome_usuario, 
                // c.nome AS nome_federacao FROM clube a 
                // INNER JOIN usuario b ON b.id = a.usuario_dirigente
                // INNER JOIN federacao c ON c.id = a.federacao_id`
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
exports.BuscarClube = BuscarClube;
var BuscarDirigenteClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT a.*, b.nome AS nm_nome_usuario FROM clube a INNER JOIN usuario b ON b.id_cred = a.usuario_dirigente WHERE a.usuario_dirigente = ", ""], ["SELECT a.*, b.nome AS nm_nome_usuario FROM clube a INNER JOIN usuario b ON b.id_cred = a.usuario_dirigente WHERE a.usuario_dirigente = ", ""])), Number(dados.id))];
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
exports.BuscarDirigenteClube = BuscarDirigenteClube;
var BuscarUmClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.clube.findUnique({
                        where: { id: Number(dados.id) }
                    })];
            case 2:
                user = _a.sent();
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
exports.BuscarUmClube = BuscarUmClube;
var EditarClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, validacao, user, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 12]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                id = request.params.id;
                body = request.body;
                return [4 /*yield*/, prisma.clube.findUnique({ where: { usuario_dirigente: body.usuario_dirigente } })];
            case 2:
                validacao = _a.sent();
                if (!((validacao === null || validacao === void 0 ? void 0 : validacao.usuario_dirigente) && validacao.id === body.id)) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.clube.update({
                        where: { id: Number(id) },
                        data: body
                    })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 5:
                if (!!(validacao === null || validacao === void 0 ? void 0 : validacao.usuario_dirigente)) return [3 /*break*/, 8];
                return [4 /*yield*/, prisma.clube.update({
                        where: { id: Number(id) },
                        data: body
                    })];
            case 6:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 7:
                _a.sent();
                return [2 /*return*/, response.json(user)];
            case 8: return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _a.sent();
                return [2 /*return*/, response.json({ message: "O Clube ja Possui esse Dirigente", code: "Diriginte" })];
            case 10:
                error_5 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 11:
                _a.sent();
                return [2 /*return*/, console.log(error_5)];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.EditarClube = EditarClube;
var DeletarClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.clube["delete"]({ where: { id: Number(dados.id) } })];
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
                return [2 /*return*/, response.json(error_6)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.DeletarClube = DeletarClube;
var templateObject_1;
//# sourceMappingURL=ClubeControllers.js.map