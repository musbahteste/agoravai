"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.multerConfig = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
exports.multerConfig = {
    dest: path_1["default"].resolve(__dirname, 'temp', 'documents'),
    storage: multer_1["default"].diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1["default"].resolve(__dirname, 'temp', 'documents'));
        },
        filename: function (req, file, cb) {
            crypto_1["default"].randomBytes(16, function (err, hash) {
                if (err)
                    cb(err, "");
                var fileName = hash.toString('hex') + "-" + file.originalname;
                cb(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        var allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'application/pdf',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Tipo do Arquivo é Inválido!!!"));
        }
    }
};
//# sourceMappingURL=multer.js.map