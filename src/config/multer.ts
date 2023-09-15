import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { Request } from 'express';

export const multerConfig = {
    dest: path.resolve(__dirname, 'temp', 'documents'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, 'temp', 'documents'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, "");

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName)
            })
        }

    }),

    limits: {
        fileSize: 2 * 1024 * 1024,
    },

    fileFilter: (req: Request, file: any, cb: Function) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'application/pdf',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo do Arquivo é Inválido!!!"));
        }
    },

};