import CustomPagesModel from '../models/CustomPages'

class CustomPagesController {
  static List = async(req, res, next) => {
    try {
      const result = await CustomPagesModel.Read()
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: 'All Custom Pages',
          pages: result
        })
      }
    }
    catch(err) { next(err) }
  }

  static Detail = async(req, res, next) => {
    try {
      const { customUrl } = req.params
      const result = await CustomPagesModel.Read({ customUrl })
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: `Custom Pages Detail of ${ customUrl }`,
          detail: result
        })
      }
    }
    catch(err) { next(err) }
  }

  static Create = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { customUrl, pageContent } = req.body
      if(!customUrl || !pageContent) {
        throw { message: 'customUrl and pageContent must be filled' }
      }
      else if(customUrl.length < 8 || pageContent.length < 8) {
        throw { message: 'customUrl and pageContent minimum length is eight letters' }
      }
      else {
        const result = await CustomPagesModel.Create({ userId, customUrl, pageContent })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `Custom page successfully created`,
            pagesId: result._id
          })
        }
      }
      
    }
    catch(err) { next(err) }
  }
  
  static Update = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { pageId, customUrl, pageContent } = req.body
      if(!pageId || !customUrl || !pageContent) {
        throw { message: 'pageId, customUrl, and pageContent must be filled' }
      }
      else if(customUrl.length < 8 || pageContent.length < 8) {
        throw { message: 'pageContent minimum length is eight letters' }
      }
      else {
        const result = await CustomPagesModel.Update({ userId, pageId, customUrl, pageContent })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: 'Successfully updated the Page Content'
          })
        }
      }
    }
    catch(err) { next(err) }
  }
  
  static Delete = async(req, res, next) => {
    try {
      const userId = req.payload.id
      const { pageId } = req.body
      if(!pageId) { throw { message: 'pageId must be filled' } }
      else {
        const result = await CustomPagesModel.Delete({ userId, pageId })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `Successfully removed ${ result.pageContent } from the Custom Pages`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
}

export default CustomPagesController