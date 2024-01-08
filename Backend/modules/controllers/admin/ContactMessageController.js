import Controller from '../Controller.js';

export default new class ContactMessageController extends Controller {

    async getContactMessages(req, res) {
        try {
            const result = await this.model.ContactMessage.find();
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

    async editContactMessage(req, res) {
        try {
            let listFields = {};
            if (req.body.fullName) { listFields.fullName = req.body.fullName }
            if (req.body.email) { listFields.email = req.body.email }
            if (req.body.mobile) { listFields.mobile = req.body.mobile }
            if (req.body.title) { listFields.title = req.body.title }
            if (req.body.message) { listFields.message = req.body.message }
            const result = await this.model.ContactMessage.findByIdAndUpdate(req.params.id, listFields);
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

    async addContactMessage(req, res) {
        try {
            const doc = await this.model.ContactMessage({
            fullName: req.body.fullName,
            email:req.body.email,
            mobile:req.body.mobile,
            title:req.body.title,
            message:req.body.message,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async deleteContactMessage(req, res) {
        try {
            const result = await this.model.ContactMessage.findByIdAndDelete(req.params.id);
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

}



