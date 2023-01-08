import express from 'express'
import { router as indexRouter } from './routes/index.js';
import { join, resolve } from 'path';


const app = express();

app.set('views', join(resolve(), 'src', 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter);

app.listen(3000, () => console.log('listenning on port 3000'))