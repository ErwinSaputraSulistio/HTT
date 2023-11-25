import Database from '../config/Database'
import NewsModel from './News'

const CommentsSchema = new Database.Schema(
  {
    newsId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
    collection: 'Comments'
  }
)

const CommentsCollection = Database.model('Comments', CommentsSchema)

class CommentsModel {
  static Create = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const isNewsExist = await NewsModel.Read(data.newsId)
        if(isNewsExist) {
          const result = await CommentsCollection.create(data)
          if(result) { resolve(result) }
        }
      }
      catch(err) { reject(err) }
    })
  }
  
  static Read = (id) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CommentsCollection.find({ newsId: id })
        if(result) { resolve(result) }
      }
      catch(err) { reject(err) }
    })
  }
}

export default CommentsModel