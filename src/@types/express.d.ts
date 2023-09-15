declare namespace Express {
    export interface Request {
        userId: number;
        path: string;
    }
}