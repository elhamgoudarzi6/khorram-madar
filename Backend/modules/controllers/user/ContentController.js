import Controller from '../Controller.js';

export default new class ContentController extends Controller {

    async addContactMessage(req, res) {
        try {
            const doc = await this.model.ContactMessage({
                fullName: req.body.fullName,
                email: req.body.email,
                mobile: req.body.mobile,
                title: req.body.title,
                message: req.body.message
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: err, success: false });
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



        async addRating(req, res) {
        try {
            const result = await this.model.Rating.findOne({userID: req.body.userID });
                if (Result){
                        return res.json({ data:"شما قبلا در نظرسنجی شرکت کرده اید" , success: false });
            } else {
            const doc = await this.model.Rating({
                 userID:req.body.userID,
               rating:req.body.rating,
               other:req.body.other,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        }
        catch (err) {
            res.json({ data: err, success: false });
        }
    }
    
    
       async getRating(req, res) {
        try {
            const result = await this.model.Rating.aggregate([{ $unwind: "$rating" },{ $group: { _id: null, avg: { $avg: "$rating.rate" } }} ]).exec();
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
    
    
       async getRatingByCode(req, res) {
        try {
            const result = await this.model.Rating.aggregate([{ $unwind: "$rating" }, { $match:{"rating.code":req.params.id}},{ $group: { _id: null, avg: { $avg: "$rating.rate" } }} ]).exec();
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

    async getGallery(req, res) {
        try {
            const result = await this.model.Gallery.find();
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
            res.json({ data: err, success: false });
        }
    }


}
