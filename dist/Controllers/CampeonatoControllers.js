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
exports.__esModule = true;
exports.BuscarCampeonatoPresidente = exports.DeletarCampeonato = exports.EditarCampeonato = exports.BuscarUmCampeonato = exports.BuscarCampeonatoClube = exports.BuscarCampeonato = exports.SalvarCampeonato = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var SalvarCampeonato = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                body = request.body;
                return [4 /*yield*/, prisma.campeonato.create({ data: body })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
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
exports.SalvarCampeonato = SalvarCampeonato;
var BuscarCampeonato = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.campeonato.findMany()];
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
exports.BuscarCampeonato = BuscarCampeonato;
var BuscarCampeonatoClube = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                id = request.params;
                return [4 /*yield*/, prisma.campeonato.findMany({
                        where: { clube_id: Number(id.id) },
                        include: {
                            usuario: {
                                select: { nome: true }
                            },
                            clube: {
                                select: {
                                    nome: true
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
                error_3 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_3)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarCampeonatoClube = BuscarCampeonatoClube;
var BuscarUmCampeonato = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.campeonato.findUnique({
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
exports.BuscarUmCampeonato = BuscarUmCampeonato;
var EditarCampeonato = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                id = request.params.id;
                body = request.body;
                return [4 /*yield*/, prisma.campeonato.update({
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
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, console.log(error_5)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.EditarCampeonato = EditarCampeonato;
var DeletarCampeonato = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.campeonato["delete"]({ where: { id: Number(dados.id) } })];
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
exports.DeletarCampeonato = DeletarCampeonato;
var BuscarCampeonatoPresidente = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var perfilUser, camp, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 10]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.herarquia.findFirst({
                        where: { usuario_id: Number(request.userId) }
                    })];
            case 2:
                perfilUser = _a.sent();
                console.log(perfilUser);
                if (!((perfilUser === null || perfilUser === void 0 ? void 0 : perfilUser.perfil) === "Admin")) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma.campeonato.findMany({
                        include: {
                            clube: true,
                            usuario: true,
                            provas: true
                        }
                    })];
            case 3:
                camp = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [2 /*return*/, response.json(camp)];
            case 5: return [4 /*yield*/, prisma.$disconnect()];
            case 6:
                _a.sent();
                return [2 /*return*/, response.json({
                        error: "Usuario não tem permissão para acessar essa informação",
                        code: "sem permissao"
                    })];
            case 7: return [3 /*break*/, 10];
            case 8:
                error_7 = _a.sent();
                console.log(error_7);
                return [4 /*yield*/, prisma.$disconnect()];
            case 9:
                _a.sent();
                return [2 /*return*/, response.json(error_7)];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.BuscarCampeonatoPresidente = BuscarCampeonatoPresidente;
//# sourceMappingURL=CampeonatoControllers.js.map