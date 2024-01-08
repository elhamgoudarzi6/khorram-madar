import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { secret } from '../../../config.js';

export default (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        return jwt.verify(token, secret, (err, decode) => {
            if (err) {
                return res.json({
                    success: false,
                    data: 'Failed to authenticate token.'
                })
            }
            const user = User.findById(decode.user_id).exec();
            if (user) {
                user.token = token;
                req.user = user;
                next();
            } else {
                return res.json({
                    success: false,
                    data: 'User not found'
                });
            }
            // next();
            // return;
        })
    }
    return res.status(403).json({
        data: 'No Token Provided',
        success: false
    })
}



