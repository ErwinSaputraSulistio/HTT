import { Router } from 'express'
import CategoriesController from '../controllers/Categories'

const CategoriesRoutes = Router()

CategoriesRoutes.get('/', CategoriesController.List)
CategoriesRoutes.get('/:id', CategoriesController.Detail)
CategoriesRoutes.post('/', CategoriesController.Create)
CategoriesRoutes.put('/', CategoriesController.Update)
CategoriesRoutes.delete('/', CategoriesController.Delete)

export default CategoriesRoutes