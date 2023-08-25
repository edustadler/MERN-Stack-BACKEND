import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import crudRouter from './routes/crudRouter';
import userRouter from './routes/userRouter';

//express app
const app = express()

//middleware
app.use(cors({ credentials: true, }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

//routes
app.use("/", crudRouter, userRouter);

//Connect with db
const server = http.createServer(app)

//port
server.listen(9999)