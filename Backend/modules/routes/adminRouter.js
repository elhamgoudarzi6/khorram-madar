
import { Router } from 'express';
const router = Router();

import apiAuth from './middleware/apiAuthAdmin.js';
import { uploadFile, uploadFiles } from './middleware/uploader.js';

import AdminController from '../controllers/admin/AdminController.js';
import UserController from '../controllers/admin/UserController.js';
import UploadController from '../controllers/admin/UploadController.js';
import GalleryController from '../controllers/admin/GalleryController.js';
import OrderController from '../controllers/admin/OrderController.js';
import FaqController from '../controllers/admin/FaqController.js';
import ContactMessageController from '../controllers/admin/ContactMessageController.js';

router.post('/upload', uploadFile, UploadController.uploadFile.bind(UploadController));
router.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));
router.post('/deleteFile', UploadController.deleteFile.bind(UploadController));

router.post('/authUser', apiAuth, UserController.authUser.bind(UserController));
router.put('/updateUser/:id', apiAuth, UserController.updateUser.bind(UserController));
router.delete('/deleteUser/:id', apiAuth, UserController.deleteUser.bind(UserController));
router.get('/getUsers', apiAuth, UserController.getUsers.bind(UserController));

router.post('/addAdmin', apiAuth, AdminController.addAdmin.bind(AdminController));
router.post('/login', AdminController.login.bind(AdminController));
router.put('/editAdmin/:id', apiAuth, AdminController.editAdmin.bind(AdminController));
router.delete('/deleteAdmin/:id', apiAuth, AdminController.deleteAdmin.bind(AdminController));
router.get('/getAdmins', apiAuth, AdminController.getAdmins.bind(AdminController));

router.post('/addFaq', apiAuth, FaqController.addFaq.bind(FaqController));
router.put('/editFaq/:id', apiAuth, FaqController.editFaq.bind(FaqController));
router.delete('/deleteFaq/:id', apiAuth, FaqController.deleteFaq.bind(FaqController));
router.get('/getFaqs', apiAuth, FaqController.getFaqs.bind(FaqController));

router.post('/addGallery', apiAuth, GalleryController.addGallery.bind(GalleryController));
router.put('/editGallery/:id', apiAuth, GalleryController.editGallery.bind(GalleryController));
router.delete('/deleteGallery/:id', apiAuth, GalleryController.deleteGallery.bind(GalleryController));
router.get('/getGallery', apiAuth, GalleryController.getGallery.bind(GalleryController));

router.post('/addOrder', apiAuth, OrderController.addOrder.bind(OrderController));
router.put('/editOrder/:id', apiAuth, OrderController.editOrder.bind(OrderController));
router.delete('/deleteOrder/:id', apiAuth, OrderController.deleteOrder.bind(OrderController));
router.get('/getOrders', apiAuth, OrderController.getOrders.bind(OrderController));


router.post('/addContactMessage', apiAuth, ContactMessageController.addContactMessage.bind(ContactMessageController));
router.put('/editContactMessage/:id', apiAuth, ContactMessageController.editContactMessage.bind(ContactMessageController));
router.delete('/deleteContactMessage/:id', apiAuth, ContactMessageController.deleteContactMessage.bind(ContactMessageController));
router.get('/getContactMessages', apiAuth, ContactMessageController.getContactMessages.bind(ContactMessageController));

export default router;