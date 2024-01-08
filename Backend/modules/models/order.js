import { Schema, model } from 'mongoose';

const schema = new Schema({
     userID: { type: Schema.ObjectId, ref: 'User' },
    code: { type: String},
    title: { type: String},
    pcbType:{ type: String },
    number: { type: String},
    material:  { type: String},
    copperThickness:{ type: String },
    celeryPrint:{ type: String },
    cover: { type: String}, 
    protectiveColor:{ type: String},
    partsPrinting:{ type: String},
    dimensionsBoardX:{ type: String},
    dimensionsBoardY:{ type: String},
    pcbThickness:{ type: String},
    eTest:{ type: String},
    carbonPrinting:{ type: String},
    finalCut:{ type: String},
    partsColor:{type:String},
    description:{type:String},
    files:{type:Array},
    status: { type: String,default:"در حال بررسی"},
},{toJSON:{virtuals:true}});
schema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
export default model('Order', schema);