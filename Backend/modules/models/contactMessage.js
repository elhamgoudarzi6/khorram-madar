import { Schema, model } from 'mongoose';

const schema = new Schema({
    fullName: { type: String },
    email: { type: String },
    mobile: { type: String },
    title: { type: String },
    message: { type: String },
});
export default model('ContactMessage', schema);