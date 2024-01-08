import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String },
    image: { type: String },
    type: { type: String, default: 'admin' },
    token: { type: String },
});
schema.pre('save', async function save(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
});
export default model('Admin', schema);