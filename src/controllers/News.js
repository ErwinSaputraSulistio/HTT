import NewsModel from '../models/News'

class NewsController {
  static List = async(req, res, next) => {
    try {
      const result = await NewsModel.Read()
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: 'All News',
          news: result
        })
      }
    }
    catch(err) { next(err) }
  }

  static Detail = async(req, res, next) => {
    try {
      const { id } = req.params
      const result = await NewsModel.Read(id)
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: `News Detail of ${ id }`,
          detail: result
        })
      }
    }
    catch(err) { next(err) }
  }

  static Create = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { categoryId, newsContent } = req.body
      if(!categoryId || !newsContent) {
        throw { message: 'categoryId and newsContent must be filled' }
      }
      else if(newsContent.length < 20) {
        throw { message: 'newsContent minimum length is twenty letters' }
      }
      else {
        const result = await NewsModel.Create({ userId, categoryId, newsContent })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `News successfully created`,
            newsId: result._id
          })
        }
      }
    }
    catch(err) { next(err) }
  }

  static Update = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { newsId, categoryId, newsContent } = req.body
      if(!newsId || !categoryId || !newsContent) {
        throw { message: 'newsId, categoryId, and newsContent must be filled' }
      }
      else if(newsContent.length < 20) {
        throw { message: 'newsContent minimum length is twenty letters' }
      }
      else {
        const result = await NewsModel.Update({ userId, newsId, categoryId, newsContent })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: 
              `Successfully updated the News Content from ${ 
              result.newsContent } to ${ newsContent }`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
  
  static Delete = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { newsId } = req.body
      if(!newsId) { throw { message: 'newsId must be filled' } }
      else {
        const result = await NewsModel.Delete({ userId, newsId })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `Successfully removed ${ result.newsContent } from the News`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
}

export default NewsController