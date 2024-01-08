import Controller from '../Controller.js';
import { secret, tokenExpireTime } from '../../../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default new class AdminController extends Controller {
    async addAdmin(req, res) {
        try {
            const result = await this.model.Admin.findOne({ userName: req.body.userName });
            if (!result) {
                const data = await this.model.Admin({
                    userName: req.body.userName,
                    password: req.body.password,
                    fullName: req.body.fullName,
                    image: req.body.image,
                });
                await data.save();
                let token = jwt.sign({ user_id: data._id }, secret, { expiresIn: tokenExpireTime });
                await this.model.Admin.findByIdAndUpdate(data.id, { token: token });
                return res.json({ data: 'ثبت شد', success: true });
            } else {
                return res.json({ data: 'نام کاربری تکراری است', success: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async login(req, res) {
        try {
            const result = await this.model.Admin.findOne({ userName: req.body.userName });
            if (!result) {
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            }
            const isMatch = await bcrypt.compare(req.body.password, result.password);
            if (!isMatch) {
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            }
            let token = jwt.sign({ user_id: result._id }, secret, { expiresIn: tokenExpireTime });
            await this.model.Admin.findByIdAndUpdate(result.id, { token: token }).exec();
            const doc = await this.model.Admin.findById(result.id, { password: 0 }).exec();
            return res.json({ data: doc, success: true });
        } catch (e) {
            console.log('err')
        }
    }

    async editAdmin(req, res) {
        try {
            let listFields = {};
            if (req.body.fullName) { listFields.fullName = req.body.fullName }
            if (req.body.userName) { listFields.userName = req.body.userName }
            if (req.body.password) { listFields.password = req.body.password }
            if (req.body.image) { listFields.image = req.body.image }
            const result = await this.model.Admin.findByIdAndUpdate(req.params.id, listFields);
            if (result) {
                return res.json({
                    data: 'ویرایش شد',
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async deleteAdmin(req, res) {
        try {
            const result = await this.model.Admin.findByIdAndDelete(req.params.id);
            if (result) {
                return res.json({
                    data: 'حذف شد',
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async getAdmins(req, res) {
        try {
            const result = await this.model.Admin.find({}, { token: 0 });
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            console.log(err.message);
        }

    }


}
