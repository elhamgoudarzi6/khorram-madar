import Controller from '../Controller.js';
import jwt from 'jsonwebtoken';
import { secret, tokenExpireTime } from '../../../config.js';

export default new class UserController extends Controller {

    async authUser(req, res) {
        try {
            const result = await this.model.User.findOne({ mobile: req.body.mobile });
            if (!result) {
                const data = await this.model.User({
                    mobile: req.body.mobile,
                });
                await data.save();
                let token = jwt.sign({ user_id: data._id }, secret, { expiresIn: tokenExpireTime });
                await this.model.User.findByIdAndUpdate(data.id, { token: token });
                const doc = await this.model.User.findById(data.id);
                return res.json({ data: doc, success: true });
            } else {
                let token = jwt.sign({ user_id: result._id }, secret, { expiresIn: tokenExpireTime });
                await this.model.User.findByIdAndUpdate(result.id, { token: token });
                const doc = await this.model.User.findById(result.id);
                return res.json({ data: doc, success: true });
            }
        }
        catch (err) {
            //handleError(err);
            console.log(err);
        }
    }

    async updateUser(req, res) {
        try {
            let listFields = {};
            if (req.body.fullName) { listFields.fullName = req.body.fullName }
            if (req.body.image) { listFields.image = req.body.image }
            if (req.body.phone) { listFields.phone = req.body.phone }
            if (req.body.email) { listFields.email = req.body.email }
            const result = await this.model.User.findByIdAndUpdate(req.params.id, listFields);
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

    async deleteUser(req, res) {
        try {
            const result = await this.model.User.findByIdAndDelete(req.params.id);
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


    async getUsers(req, res) {
        try {
            const result = await this.model.User.find({}, { token: 0 });
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
