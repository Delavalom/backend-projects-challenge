import express from 'express'
import cors from 'cors'
import { router as apiRouter } from './routes/api.js';
import { join, resolve } from 'path';


const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter);

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listenning on port ${port}`))