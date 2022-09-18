import { Router } from 'express';
import { getCountries } from '../Controllers/countriesAndCities';


const router = Router();

router.get('/', getCountries);

export default router;