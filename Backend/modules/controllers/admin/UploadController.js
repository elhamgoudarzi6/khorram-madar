import Controller from '../Controller.js';
import { uploadUrl, deleteUrl } from '../../../config.js';
import fs from 'fs';

export default new class UploadController extends Controller {

    uploadFiles(req, res) {
        if (req.files) {
            let data = []
            for (let i = 0; i < req.files.length; i++) {
                data[i] = uploadUrl + req.files[i].path.replace(/\\/g, '/');
            }
            res.json({
                data: data,
                success: true,
            })
        } else {
            res.json({
                message: 'آپلود نشد',
                success: false
            })
        }
    }

    uploadFile(req, res) {
        if (req.file) {
            res.json({
                message: 'آپلود شد',
                path: uploadUrl + req.file.path.replace(/\\/g, '/'),
                success: true,
            })
        } else {
            res.json({
                message: 'آپلود نشد',
                success: false
            })
        }
    }

    deleteFile(req, res) {
        try {
            fs.unlink((deleteUrl + req.body.path).replace(/\\/gi, '/'), (err) => {
                if (err) {
                    return res.json({
                        data: 'موجود نیست',
                        success: false
                    })
                }
                return res.json({
                    data: 'حذف شد',
                    success: true
                })
            });
        } catch (error) {
            return res.json({
                data: 'موجود نیست',
                success: false
            })
        }
    }

}