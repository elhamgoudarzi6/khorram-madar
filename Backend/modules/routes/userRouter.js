import { Router } from 'express';
const router = Router();
import apiAuth from './middleware/apiAuthUser.js';
import { uploadFile, uploadFiles } from './middleware/uploader.js';

import UserController from '../controllers/user/UserController.js';
import UploadController from '../controllers/user/UploadController.js';
import ContentController from '../controllers/user/ContentController.js';
import OrderController from '../controllers/user/OrderController.js';

router.post('/upload', uploadFile, UploadController.uploadFile.bind(UploadController));
router.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));
router.post('/deleteFile', UploadController.deleteFile.bind(UploadController));

router.post('/authUser', UserController.authUser.bind(UserController));
router.put('/editUser/:id', apiAuth, UserController.editUser.bind(UserController));

router.get('/getGallery', ContentController.getGallery.bind(ContentController));
router.get('/getFaqs', ContentController.getFaqs.bind(ContentController));
router.post('/addContactMessage', ContentController.addContactMessage.bind(ContentController));
router.post('/addRating', ContentController.addRating.bind(ContentController));
router.get('/getRating', ContentController.getRating.bind(ContentController));
router.get('/getRatingByCode/:id', ContentController.getRatingByCode.bind(ContentController));

router.post('/addOrder', apiAuth, OrderController.addOrder.bind(OrderController));
router.put('/editOrder/:id', apiAuth, OrderController.editOrder.bind(OrderController));
router.delete('/deleteOrder/:id', apiAuth, OrderController.deleteOrder.bind(OrderController));
router.get('/getOrdersByUser', apiAuth, OrderController.getOrdersByUser.bind(OrderController));

export default router;