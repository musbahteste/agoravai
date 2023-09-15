import express from 'express'
import bodyParcer from 'body-parser'
import routes from './routes'
import cors from 'cors'


const app = express()
app.use(cors());
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})
app.use(bodyParcer.json())
app.use(routes)
const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`🚀 Server Rodando em: http://localhost:3001`)
})