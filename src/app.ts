import express from "express"
// import naoRouter from './routers/naoRouter';
const app = express()
express.json()
app.use('/api/nao')

export default app;
