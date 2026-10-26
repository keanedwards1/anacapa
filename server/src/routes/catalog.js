import { Router } from 'express'
import mongoose from 'mongoose'
import { Category } from '../models/Category.js'

const router = Router()

export const starterCategories = [
  {
    slug: 'turning',
    name: 'Turning',
    detail: 'Carbide inserts for turning operations. Tell us what you need and what material you cut.',
  },
  {
    slug: 'milling',
    name: 'Milling',
    detail: 'Carbide inserts for milling applications. Tell us what you need and what material you cut.',
  },
]

router.get('/', async (_request, response, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find({}, 'slug name detail').sort({ name: 1 }).lean()
      if (categories.length) return response.json({ categories, source: 'database' })
    }
    return response.json({ categories: starterCategories, source: 'starter' })
  } catch (error) {
    next(error)
  }
})

export default router
