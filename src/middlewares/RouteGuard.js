import { verify } from 'jsonwebtoken'

const RouteGuard = (req, res, next) => {
  const header = req.headers.authorization
  if(!header) { throw { code: 404, message: 'No token found in the header' } }
  else {
    const token = header.split(' ')[1]
    verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
      if(err) { 
        const errorDetail = {
          name: err.name,
          message: err.message
        }
        throw { code: 401, ...errorDetail } 
      }
      else { 
        req.payload = result
        next() 
      }
    })
  }
}

export default RouteGuard