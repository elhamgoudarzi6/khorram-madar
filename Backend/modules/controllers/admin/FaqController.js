import Controller from '../Controller.js';

export default new class FaqController extends Controller {

    async addFaq(req, res) {
        try {
            const doc = await this.model.Faq({
                question: req.body.question,
                reply: req.body.reply,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async editFaq(req, res) {
        try {
            let listFields = {};
            if (req.body.question) { listFields.question = req.body.question }
            if (req.body.reply) { listFields.reply = req.body.reply }
            const result = await this.model.Faq.findByIdAndUpdate(req.params.id, listFields);
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

    async deleteFaq(req, res) {
        try {
            const result = await this.model.Faq.findByIdAndDelete(req.params.id);
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


    async getFaqs(req, res) {
        try {
            const result = await this.model.Faq.find({});
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
