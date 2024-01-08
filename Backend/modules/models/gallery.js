import { Schema, model } from 'mongoose';

const schema = new Schema({
    url: { type: String },
    alt: { type: String },
});
export default model('Gallery', schema);
