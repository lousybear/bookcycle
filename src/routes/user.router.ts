import express from 'express';
const app = express();
const router = express.Router();
import { me, signIn, signUp } from "../controllers/auth.controller"
import { requireAuth } from '../middleware/auth.middleware';

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.get('/me', requireAuth, me);

app.use('/', router);

export default router;