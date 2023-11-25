import Database from '../config/Database'

const CategoriesSchema = new Database.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    collection: 'Categories'
  }
)

const CategoriesCollection = Database.model('Categories', CategoriesSchema)

class CategoriesModel {
  static Create = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CategoriesCollection.create(data)
        if(result) { resolve(result) }
      }
      catch(err) { reject(err) }
    })
  }
  
  static Read = (id) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CategoriesCollection.find(id && { _id: id })
        if(result && result.length > 0) { resolve(result) }
        else { throw { code: 404, message: 'No categories found' } }
      }
      catch(err) { reject(err) }
    })
  }

  static Update = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CategoriesCollection.findOneAndUpdate(
          { _id: data.categoryId }, 
          { categoryName: data.categoryName }
        )
        if(result) { resolve(result) }
        else { throw { code: 404, message: 'No categories found with this ID' } }
      }
      catch(err) { reject(err) }
    })
  }
  
  static Delete = (id) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await CategoriesCollection.findOneAndDelete({ _id: id })
        if(result) { resolve(result) }
        else { throw { code: 404, message: 'No categories found with this ID' } }
      }
      catch(err) { reject(err) }
    })
  }
}

export default CategoriesModel