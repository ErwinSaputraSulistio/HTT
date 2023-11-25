import { Router } from 'express'
import CommentsController from '../controllers/Comments'

const CommentsRoutes = Router()

CommentsRoutes.post('/', CommentsController.Create)

export default CommentsRoutes