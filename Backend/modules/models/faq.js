import { Schema, model } from 'mongoose';

const schema = new Schema({
    question: { type: String },
    reply: { type: String },
});
export default model('Faq', schema);
