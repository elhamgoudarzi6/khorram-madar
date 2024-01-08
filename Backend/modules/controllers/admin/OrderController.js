import Controller from '../Controller.js';
import { generate } from 'randomstring';

export default new class OrderController extends Controller {

    async getOrders(req, res) {
        try {
            const result = await this.model.Order.find().populate('User');
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

    async editOrder(req, res) {
        try {
            let listFields = {};
             if (req.body.title) { listFields.title = req.body.title }
        if (req.body.pcbType) { listFields.pcbType = req.body.pcbType }
        if (req.body.number) { listFields.number = req.body.number }
         if (req.body.celeryPrint) { listFields.celeryPrint = req.body.celeryPrint }
        if (req.body.material) { listFields.material = req.body.material }
        if (req.body.copperThickness) { listFields.copperThickness = req.body.copperThickness }
        if (req.body.cover) { listFields.cover = req.body.cover }
        if (req.body.userID) { listFields.userID = req.body.userID }
        if (req.body.protectiveColor) { listFields.protectiveColor = req.body.protectiveColor }
        if (req.body.partsPrinting) { listFields.partsPrinting = req.body.partsPrinting }
        if (req.body.dimensionsBoardX) { listFields.dimensionsBoardX = req.body.dimensionsBoardX }
        if (req.body.dimensionsBoardY) { listFields.dimensionsBoardY = req.body.dimensionsBoardY }
        if (req.body.pcbThickness) { listFields.pcbThickness = req.body.pcbThickness }
        if (req.body.eTest) { listFields.eTest = req.body.eTest }
        if (req.body.carbonPrinting) { listFields.carbonPrinting = req.body.carbonPrinting }
        if (req.body.finalCut) { listFields.finalCut = req.body.finalCut }
        if (req.body.partsColor) { listFields.partsColor = req.body.partsColor }
        if (req.body.description) { listFields.description = req.body.description }
        if (req.body.files) { listFields.files = req.body.files }
                if (req.body.status) { listFields.status = req.body.status }
            const result = await this.model.Order.findByIdAndUpdate(req.params.id, listFields);
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

    async addOrder(req, res) {
        try {
            const doc = await this.model.Order({
             code:generate({charset: '123456789', length: 8}),
    userID:req.body.userID,
    title:req.body.title,
    pcbType:req.body.pcbType,
    number:req.body.number,
    celeryPrint:req.body.celeryPrint,
    material: req.body.material,
    copperThickness:req.body.copperThickness,
    cover: req.body.cover, 
    protectiveColor:req.body.protectiveColor,
    partsPrinting:req.body.partsPrinting,
    dimensionsBoardX:req.body.dimensionsBoardX,
    dimensionsBoardY:req.body.dimensionsBoardY,
    pcbThickness:req.body.pcbThickness,
    eTest:req.body.eTest,
    carbonPrinting:req.body.carbonPrinting,
    finalCut:req.body.finalCut,
    partsColor:req.body.partsColor,
    description:req.body.description,
    files:req.body.files,
    status:req.body.status});
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }

    async deleteOrder(req, res) {
        try {
            const result = await this.model.Order.findByIdAndDelete(req.params.id);
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
