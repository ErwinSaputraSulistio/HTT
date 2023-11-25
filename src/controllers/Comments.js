import CommentsModel from '../models/Comments'

class CommentsController {
  static Create = async(req, res, next) => {
    try {
      const { newsId, name, comment } = req.body
      if(!newsId || !name || !comment) {
        throw { code: 400, message: 'newsId, name, and comment must be filled' }
      }
      else if(name.length < 3 || comment.length < 3) {
        throw { message: 'name and comment minimum length are three letters' }
      }
      else {
        const result = await CommentsModel.Create({ newsId, name, comment })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `A comment is successfully created for newsId ${ newsId }`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
}

export default CommentsController