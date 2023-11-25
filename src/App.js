import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Routes from './routes'
import ErrorHandler from './middlewares/ErrorHandler'

const App = express()
const port = process.env.PORT || 8000

App.use(cors())
App.use(express.urlencoded({ extended: false }))
App.use(express.json())

App.use('/', Routes)
App.use(ErrorHandler)

App.listen(port, () => console.log(`App listening at port ${ port }`))
