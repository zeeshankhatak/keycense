import express from 'express'
import {
  createMerchandise,
  deleteMerchandise,
  getMerchandise,
  getSingleMerchandise,
  updateMerchandise
} from '../controllers/merchandise'

const router = express.Router();

router.get('/', getMerchandise);
router.get('/:id', getSingleMerchandise);
router.post('/', createMerchandise);
router.put('/:id', updateMerchandise);
router.delete('/:id', deleteMerchandise);

export default router
