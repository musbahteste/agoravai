import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
const config = require('../config/auth.json')

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).send({ error: "Token não Informado" })
    }
    const authParts = authHeaders.split(' ')

    if (authParts.length !== 2) {
        return res.status(401).send({ error: "Token mal formado" });
    }

    const [scheme, token] = authParts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token mal formatado" })
    }


    try {
        const data = jwt.verify(token, config.secret)
        const { id } = data as TokenPayload

        req.userId = id;

        return next()
    } catch {
        return res.sendStatus(401);
    }



}