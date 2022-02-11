import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import env from 'dotenv'
import http from 'http'
import socketIO from 'socket.io'
import sockets from './sockets/sockets'
import cookieParser from 'cookie-parser'
import AdminRoute from './routes/admin'
import UserRoute from './routes/user'
import CandidateRoute from './routes/candidate'
import BiometricsRoute from './routes/biometrics'
import PositionRoute from "./routes/position"
import VoteRoute from './routes/votes'
env.config()

const mongooseOptions: object = {
    useUnifiedTopology : true,
}
// @ts-ignore
mongoose.connect(process.env.MONGO_URI, mongooseOptions)
.then(() => server.listen(process.env.PORT || 8000, () => console.log('Server is runing'))
)
// @ts-ignore 
.catch(err => console.log(err.message))

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const server = http.createServer(app)
// @ts-ignore
export const io = socketIO(server) 
sockets(io)
app.get('/', (req: Request, res: Response) => res.status(200).send('Server is running'))
app.use('/api', AdminRoute)
app.use('/api', UserRoute)
app.use('/api', CandidateRoute)
app.use('/api', BiometricsRoute)
app.use('/api', PositionRoute)
app.use('/api', VoteRoute)


