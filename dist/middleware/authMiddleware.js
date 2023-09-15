"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config = require('../config/auth.json');
var authMiddleware = function (req, res, next) {
    var authHeaders = req.headers.authorization;
    if (!authHeaders) {
        return res.status(401).send({ error: "Token não Informado" });
    }
    var authParts = authHeaders.split(' ');
    if (authParts.length !== 2) {
        return res.status(401).send({ error: "Token mal formado" });
    }
    var scheme = authParts[0], token = authParts[1];
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token mal formatado" });
    }
    try {
        var data = jsonwebtoken_1["default"].verify(token, config.secret);
        var id = data.id;
        req.userId = id;
        return next();
    }
    catch (_a) {
        return res.sendStatus(401);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map