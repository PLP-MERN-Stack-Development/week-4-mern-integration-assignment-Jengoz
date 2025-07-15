import express from 'express';
import {
  getAllCategories,
  createCategory,
} from '../controllers/categoryController.js';

import { body } from 'express-validator';

const router = express.Router();

router.get('/', getAllCategories);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required'),
  ],
  createCategory
);

export default router;
