import { Schema, model } from 'mongoose';

const schema = new Schema({
        userID: { type: Schema.ObjectId, ref: 'User' },
    rating:[{code:String,rate:Number}],
    other:{type:String}
},{toJSON:{virtuals:true}});
schema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
export default model('Rating', schema);
