import { Router } from 'express';
import { filterProductsBy } from '../Controllers/Filters';

const router : Router = Router();

router.get('/', filterProductsBy);

export default router;