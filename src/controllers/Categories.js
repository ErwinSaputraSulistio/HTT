import CategoriesModel from '../models/Categories'

class CategoriesController {
  static List = async(req, res, next) => {
    try {
      const result = await CategoriesModel.Read()
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: 'All Categories',
          categories: result
        })
      }
    }
    catch(err) { next(err) }
  }

  static Detail = async(req, res, next) => {
    try {
      const { id } = req.params
      const result = await CategoriesModel.Read(id)
      if(result) {
        res.status(200).json({
          status: '--> OK.',
          message: `Category Detail of ${ id }`,
          detail: result[0]
        })
      }
    }
    catch(err) { next(err) }
  }

  static Create = async(req, res, next) => {
    try {
      const { categoryName } = req.body
      if(!categoryName) {
        throw { message: 'categoryName must be filled' }
      }
      else if(categoryName.length < 3) {
        throw { message: 'categoryName minimum length is three letters' }
      }
      else {
        const result = await CategoriesModel.Create({ categoryName })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `Successfully created ${ categoryName } as a new Category`,
            categoryId: result._id
          })
        }
      }
    }
    catch(err) { next(err) }
  }

  static Update = async(req, res, next) => {
    try {
      const { categoryId, categoryName } = req.body
      if(!categoryId || !categoryName) {
        throw { message: 'categoryId and categoryName must be filled' }
      }
      else if(categoryName.length < 3) {
        throw { message: 'categoryName minimum length is three letters' }
      }
      else {
        const result = await CategoriesModel.Update({ categoryId, categoryName })
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: 
              `Successfully updated the Category from ${ 
              result.categoryName } to ${ categoryName }`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
  
  static Delete = async(req, res, next) => {
    try {
      const { categoryId } = req.body
      if(!categoryId) {
        throw { message: 'categoryId must be filled' }
      }
      else {
        const result = await CategoriesModel.Delete(categoryId)
        if(result) {
          res.status(200).json({
            status: '--> OK.',
            message: `Successfully removed ${ result.categoryName } from the Categories`
          })
        }
      }
    }
    catch(err) { next(err) }
  }
}

export default CategoriesController