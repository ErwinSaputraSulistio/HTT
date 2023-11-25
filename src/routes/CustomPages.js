import { Router } from 'express'
import CustomPagesController from '../controllers/CustomPages'
import RouteGuard from '../middlewares/RouteGuard'

const CustomPagesRoutes = Router()

CustomPagesRoutes.get('/', CustomPagesController.List)
CustomPagesRoutes.get('/:customUrl', CustomPagesController.Detail)
CustomPagesRoutes.post('/', RouteGuard, CustomPagesController.Create)
CustomPagesRoutes.put('/', RouteGuard, CustomPagesController.Update)
CustomPagesRoutes.delete('/', RouteGuard, CustomPagesController.Delete)

export default CustomPagesRoutes