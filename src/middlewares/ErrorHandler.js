const CheckErrorDetail = (err, setErrorDetail) => {
  if(err.name === 'MongoServerError' && err.code) {
    switch(err.code) {
      case 11000:
        setErrorDetail('Already exist')
        break;
      default:
        setErrorDetail('Internal server error', 500)
    }
  }
  else if(err.name === 'CastError') { 
    setErrorDetail('ID is invalid')
  }
  else if(
    (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') 
    && 
    err.message
  ) {
    switch(err.message) {
      case 'invalid token':
      case 'invalid signature':
        setErrorDetail('JWT token invalid', 401)
        break;
      case 'jwt expired':
        setErrorDetail('JWT token expired', 401)
        break;
      default:
        setErrorDetail('JWT token problem', 401)
    }
  }
  else { setErrorDetail(err.message, err.code) }
}

const ErrorHandler = (err, req, res, next) => {
  let code = 400
  let message = 'Something went wrong'
  const setErrorDetail = (newMessage, newCode) => {
    message = newMessage || message
    code = newCode || code
  }
  CheckErrorDetail(err, setErrorDetail)
  res.status(code).json({
    status: '--> Not OK.',
    code,
    message
  })
}

export default ErrorHandler