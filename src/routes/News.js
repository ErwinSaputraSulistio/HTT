import { Router } from 'express'
import NewsController from '../controllers/News'
import RouteGuard from '../middlewares/RouteGuard'

const NewsRoutes = Router()

NewsRoutes.get('/', NewsController.List)
NewsRoutes.get('/:id', NewsController.Detail)
NewsRoutes.post('/', RouteGuard, NewsController.Create)
NewsRoutes.put('/', RouteGuard, NewsController.Update)
NewsRoutes.delete('/', RouteGuard, NewsController.Delete)

export default NewsRoutes