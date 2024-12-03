import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'

//variables entorno
dotenv.config()
//coneccion bd
connectDB()
const app = express()
//iniciamos cors y le pasamos nuestra configuracion
app.use(cors(corsConfig))

//Loggin
app.use(morgan('dev'))
//habilitar la lectura de datos json
app.use(express.json())
//Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app