import { Router } from 'express'
import UsersController from '../controllers/Users'

const UsersRoutes = Router()

UsersRoutes.post('/login', UsersController.Login)
UsersRoutes.post('/register', UsersController.Register)

export default UsersRoutes