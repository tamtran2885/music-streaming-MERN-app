import admin from "../middlewares/firebaseConfig.js";

class Auth {
    async decodeToken(req, res, next) {
        const token = await req.headers.authorization.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.user = decodeValue;
                return next();
            }
            return res.json({
                message: 'Un authorize'
            })
        } catch (error) {
            return res.json({
                message: 'Internal Error'
            })
        }
    }
}


export default new Auth();
