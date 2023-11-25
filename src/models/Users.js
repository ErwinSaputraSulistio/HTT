import Database from '../config/Database'

const UsersSchema = new Database.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
    collection: 'Users'
  }
)

const UsersCollection = Database.model('Users', UsersSchema)

class UsersModel {
  static Create = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await UsersCollection.create(data)
        if(result) { resolve(result) }
      }
      catch(err) { reject(err) }
    })
  }

  static Read = (data) => {
    return new Promise(async(resolve, reject) => {
      try {
        const result = await UsersCollection.findOne(data)
        if(result) { resolve(result) }
        else { throw { code: 404, message: 'Username is not exist' } }
      }
      catch(err) { reject(err) }
    })
  }
}

export default UsersModel