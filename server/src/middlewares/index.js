import admin from "../middlewares/firebaseConfig.js";

class Auth {
    async decodeToken(req, res, next) {
        const request = await req.headers.authorization;
        // console.log(request)

        const tokenArray = request.split(" ")
        // console.log(tokenArray)
        const token = tokenArray[1]
        console.log(token, "Im your friend")


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
