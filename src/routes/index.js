import { Router } from 'express'
import Users from './Users'
import Categories from './Categories'
import News from './News'
import CustomPages from './CustomPages'
import Comments from './Comments'

const Routes = Router()

Routes.use('/users', Users)
Routes.use('/categories', Categories)
Routes.use('/news', News)
Routes.use('/pages', CustomPages)
Routes.use('/comments', Comments)

export default Routes