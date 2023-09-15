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
exports.ResultadoProvaLista = exports.ResultadoProva = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var ResultadoProva = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var prova, dados, timeDead, tempoMorto, i, timeInitial, timeEnd, result, i, c1, c2, data1, data2, tempo, velocidade, list, i, p, v, final, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 16, , 18]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                prova = request.params;
                return [4 /*yield*/, prisma.provas_lancamento.findMany({
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
                                    longitude_solta: true
                                }
                            }
                        }
                    })];
            case 2:
                dados = _a.sent();
                timeDead = 0;
                return [4 /*yield*/, prisma.tempo_morto.findMany({
                        where: { prova_id: Number(prova.id) }
                    })];
            case 3:
                tempoMorto = _a.sent();
                if (tempoMorto.length > 0) {
                    for (i = 0; i < tempoMorto.length; i++) {
                        timeInitial = new Date(tempoMorto[i].tempo_morto_inicio).getTime();
                        timeEnd = new Date(tempoMorto[i].tempo_morto_final).getTime();
                        result = timeInitial - timeEnd;
                        timeDead = timeDead + result;
                    }
                }
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < dados.length)) return [3 /*break*/, 7];
                c1 = Math.pow((Number(dados[i].prova.latitude_solta) - Number(dados[i].latitude_chegada)), 2) + Math.pow((Number(dados[i].prova.longitude_solta) - Number(dados[i].longitude_chegada)), 2);
                c2 = Math.sqrt(c1) * 111.195 * 1000;
                data1 = new Date(String(dados[i].prova.data_hora_solta)).getTime();
                data2 = new Date(dados[i].data_hora_chegada).getTime();
                tempo = Math.abs(data2 - data1 - timeDead) / (1000 * 3600 / 60);
                velocidade = Number((c2 / tempo).toFixed(3));
                return [4 /*yield*/, prisma.provas_resultado.create({
                        data: {
                            prova_id: dados[i].prova_id,
                            prova_lanc_id: dados[i].id,
                            pombo_id: dados[i].pombo_id,
                            distancia_percorrida: c2,
                            tempo_prova: tempo,
                            velocidade_media: velocidade
                        }
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [4 /*yield*/, prisma.provas_resultado.findMany({
                    orderBy: { velocidade_media: 'desc' }
                })];
            case 8:
                list = _a.sent();
                i = 0;
                _a.label = 9;
            case 9:
                if (!(i < list.length)) return [3 /*break*/, 12];
                p = 300 - i;
                v = i + 1;
                return [4 /*yield*/, prisma.provas_resultado.update({
                        where: { id: list[i].id },
                        data: {
                            posicao: v,
                            pts: p <= 0 ? 0 : p
                        }
                    })];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 9];
            case 12: return [4 /*yield*/, prisma.provas.update({
                    where: { id: Number(prova.id) },
                    data: { prova_encerrada: true }
                })];
            case 13:
                _a.sent();
                return [4 /*yield*/, prisma.provas_resultado.findMany({
                        where: { prova_id: Number(prova.id) },
                        orderBy: { posicao: 'asc' }
                    })];
            case 14:
                final = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 15:
                _a.sent();
                return [2 /*return*/, response.json(final)];
            case 16:
                error_1 = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 17:
                _a.sent();
                return [2 /*return*/, console.log(error_1)];
            case 18: return [2 /*return*/];
        }
    });
}); };
exports.ResultadoProva = ResultadoProva;
var ResultadoProvaLista = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var dados, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                dados = request.params;
                return [4 /*yield*/, prisma.provas_resultado.findMany({
                        where: {
                            prova_id: Number(dados.id)
                        },
                        include: {
                            prova: true,
                            pombo: {
                                select: {
                                    anilha: true,
                                    usuario: { select: { nome: true } }
                                }
                            },
                            prova_lancamento: true
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
exports.ResultadoProvaLista = ResultadoProvaLista;
//# sourceMappingURL=ResultadoProva.js.map