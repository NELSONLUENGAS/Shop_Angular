import { Router} from 'express';
import brandRouter from './Brand';
import categoryRouter from './Categories';
import roleRouter from './Roles';
import userRouter from './Users';
import filterRouter from './Filter';
import purchaseHistoryRouter from './PurchaseHistory';
import productsRouter from './Products';
import ordersRouter from './Orders';
import countriesRouter from './Countries';

const router : Router = Router();



router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/role', roleRouter);
router.use('/user', userRouter);
router.use('/filter', filterRouter);
router.use('/purchaseHistory', purchaseHistoryRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/countries', countriesRouter);


export default router;