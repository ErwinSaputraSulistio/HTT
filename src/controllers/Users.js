import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import UsersModel from '../models/Users'

const salt = genSaltSync(10)

class UsersController {
  static Login = async(req, res, next) => {
    try {
      const { username, password } = req.body
      if(!username || !password) {
        throw { code: 400, message: 'username and password must be filled' }
      }
      else {
        const result = await UsersModel.Read({ username })
        if(result) {
          const isPasswordCorrect = compareSync(password, result.password)
          if(isPasswordCorrect) {
            const payload = { id: result._id }
            sign(
              payload, 
              process.env.JWT_SECRET_KEY, 
              { expiresIn: '1h' }, 
              (err, token) => {
                res.status(200).json({
                  status: '--> OK.',
                  message: 'Login successful',
                  token
                })
              }
            )
          }
          else { throw { code: 401, message: 'Wrong password' } }
        }
      }
    }
    catch(err) { next(err) }
  }
  
  static Register = async(req, res, next) => {
    try {
      const { username, password } = req.body
      if(!username || !password) {
        throw { code: 400, message: 'username and password must be filled' }
      }
      else if(username.length < 8 || password.length < 8) {
        throw new Error('username and password minimum length are eight letters')
      }
      else {
        const result = await UsersModel.Create({ 
          username, 
          password: hashSync(password, salt)
        })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: 'Register successful'
          })
        }
      }
    }
    catch(err) { next(err) }
  }
}

export default UsersController