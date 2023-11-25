import Database from '../config/Database'

const CustomPagesSchema = new Database.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    customUrl: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    pageContent: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
    collection: 'CustomPages'
  }
)

const CustomPagesCollection = Database.model('CustomPages', CustomPagesSchema)

class CustomPagesModel {
  static Create = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CustomPagesCollection.create(data)
        if(result) { resolve(result) }
      }
      catch(err) { reject(err) }
    })
  }

  static Read = (data = {}) => {
    return new Promise(async(resolve, reject) => {
      try {
        const { id, customUrl } = data
        let result = []
        if(id) { result = await CustomPagesCollection.find({ _id: id }) }
        else if(customUrl) { result = await CustomPagesCollection.find({ customUrl }) }
        else { result = await CustomPagesCollection.find() }
        if(result && result.length > 0) { resolve(result) }
        else { throw { code: 404, message: 'No custom pages found' } }
      }
      catch(err) { reject(err) }
    })
  }

  static Update = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const { userId, pageId, customUrl, pageContent } = data
        const isPageExist = await this.Read({ id: pageId })
        if(isPageExist) {
          if(isPageExist[0].userId === userId) {
            const result = await CustomPagesCollection.findOneAndUpdate(
              { _id: pageId },
              { customUrl, pageContent }
            )
            if(result) { resolve(result) }
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
        const isPageExist = await this.Read(data.pageId)
        if(isPageExist) {
          if(isPageExist[0].userId === data.userId) {
            const result = await CustomPagesCollection.findOneAndDelete({ _id: data.pageId })
            if(result) { resolve(result) }
            else { throw { code: 404, message: 'No custom pages found with this ID' } }
          }
          else { throw { code: 401, message: 'The creater and deleter ID is different' } }
        }
      }
      catch(err) { reject(err) }
    })
  }
}

export default CustomPagesModel