import Database from '../config/Database'
import CategoriesModel from './Categories'
import CommentsModel from './Comments'

const NewsSchema = new Database.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    newsContent: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
    collection: 'News'
  }
)

const NewsCollection = Database.model('News', NewsSchema)

class NewsModel {
  static Create = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const isCategoryExist = await CategoriesModel.Read(data.categoryId)
        if(isCategoryExist) { 
          const result = await NewsCollection.create(data)
          if(result) { resolve(result) }
        }
      }
      catch(err) { reject(err) }
    })
  }

  static Read = (id) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await NewsCollection.find(id && { _id: id })
        if(result && result.length > 0) {
          if(id && result.length === 1) {
            const newsComments = await CommentsModel.Read(id)
            if(newsComments) {
              resolve({
                ...result[0]._doc,
                comments: newsComments
              })
            }
          }
          else { resolve(result) }
        }
        else { throw { code: 404, message: 'No news found' } }
      }
      catch(err) { reject(err) }
    })
  }
  
  static Update = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const { userId, newsId, categoryId, newsContent } = data
        const isNewsExist = await this.Read(newsId)
        if(isNewsExist) {
          if(isNewsExist.userId === userId) {
            const isCategoryExist = await CategoriesModel.Read(categoryId)
            if(isCategoryExist) { 
              const result = await NewsCollection.findOneAndUpdate(
                { _id: newsId },
                { categoryId, newsContent }
              )
              if(result) { resolve(result) }
            }
          }
          else { throw { code: 401, message: 'The creater and updater ID is different' } }
        }
      }
      catch(err) { reject(err) }
    })
  }

  static Delete = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const isNewsExist = await this.Read(data.newsId)
        if(isNewsExist) {
          if(isNewsExist.userId === data.userId) {
            const result = await NewsCollection.findOneAndDelete({ _id: data.newsId })
            if(result) { resolve(result) }
            else { throw { code: 404, message: 'No news found with this ID' } }
          }
          else { throw { code: 401, message: 'The creater and deleter ID is different' } }
        }
      }
      catch(err) { reject(err) }
    })
  }
}

export default NewsModel