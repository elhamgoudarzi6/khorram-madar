import Controller from '../Controller.js';

export default new class GalleryController extends Controller {

    async addGallery(req, res) {
        try {
            const doc = await this.model.Gallery({
                url: req.body.url,
                alt: req.body.alt,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async editGallery(req, res) {
        try {
            let listFields = {};
            if (req.body.url) { listFields.url = req.body.url }
            if (req.body.alt) { listFields.alt = req.body.alt }
            const result = await this.model.Gallery.findByIdAndUpdate(req.params.id, listFields);
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

    async deleteGallery(req, res) {
        try {
            const result = await this.model.Gallery.findByIdAndDelete(req.params.id);
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


    async getGallery(req, res) {
        try {
            const result = await this.model.Gallery.find({});
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
