import Controller from '../Controller.js';
import jwt from 'jsonwebtoken';
import { secret } from '../../../config.js';

export default new class UserController extends Controller {

    async authUser(req, res) {
        try {
            const result = await this.model.User.findOne({ mobile: req.body.mobile });
            if (!result) {
                const data = await this.model.User({
                    mobile: req.body.mobile,
                });
                await data.save();
                let token = jwt.sign({ user_id: data._id }, secret, { expiresIn: '110h', });
                await this.model.User.findByIdAndUpdate(data.id, { token: token });
                const doc = await this.model.User.findById(data.id);
                return res.json({ data: doc, success: true });
            } else {
                let token = jwt.sign({ user_id: result._id }, secret, { expiresIn: '110h', });
                await this.model.User.findByIdAndUpdate(result.id, { token: token });
                const doc = await this.model.User.findById(result.id);
                return res.json({ data: doc, success: true });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async editUser(req, res) {
        try {
            let listFields = {};
          if (req.body.fullName) { listFields.fullName = req.body.fullName }
        if (req.body.image) { listFields.image = req.body.image }
        if (req.body.phone) { listFields.phone = req.body.phone }
        if (req.body.email) { listFields.email = req.body.email }
        if (req.body.address) { listFields.address = req.body.address }
        if (req.body.postalCode) { listFields.postalCode = req.body.postalCode }
        if (req.body.companyName) { listFields.companyName = req.body.companyName }
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





}
