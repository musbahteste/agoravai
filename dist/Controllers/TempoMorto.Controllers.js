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
exports.DeleteTempoMorto = exports.EditarTempoMorto = exports.BuscarTempoProva = exports.SalvarTempoMorto = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var SalvarTempoMorto = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data, tempo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                data = request.body;
                return [4 /*yield*/, prisma.tempo_morto.create({
                        data: data
                    })];
            case 2:
                tempo = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(tempo)];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.SalvarTempoMorto = SalvarTempoMorto;
var BuscarTempoProva = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var prova, tempo, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                prova = request.params;
                return [4 /*yield*/, prisma.tempo_morto.findMany({
                        where: {
                            prova_id: Number(prova.id)
                        }
                    })];
            case 2:
                tempo = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(tempo)];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_2)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.BuscarTempoProva = BuscarTempoProva;
var EditarTempoMorto = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var prova, data, tempo, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                prova = request.params;
                data = request.body;
                return [4 /*yield*/, prisma.tempo_morto.update({
                        where: {
                            id: Number(prova.id)
                        },
                        data: data
                    })];
            case 2:
                tempo = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(tempo)];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_3)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.EditarTempoMorto = EditarTempoMorto;
var DeleteTempoMorto = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var prova, tempo, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, prisma.$connect()];
            case 1:
                _a.sent();
                prova = request.params;
                return [4 /*yield*/, prisma.tempo_morto["delete"]({
                        where: {
                            id: Number(prova.id)
                        }
                    })];
            case 2:
                tempo = _a.sent();
                return [4 /*yield*/, prisma.$disconnect()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.json(tempo)];
            case 4:
                error_4 = _a.sent();
                console.log(error_4);
                return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [2 /*return*/, response.json(error_4)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.DeleteTempoMorto = DeleteTempoMorto;
//# sourceMappingURL=TempoMorto.Controllers.js.map