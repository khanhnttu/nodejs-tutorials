import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    if(!token){
        return res.status(404).json({
            message: 'Token is valid'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
        if(err){
            return res.status(404).json({
                message: 'The user is not authemtication'
            })
        }
        if(user.isAdmin){
            next()
        }else {
            return res.status(404).json({
                message: 'The user is not authemtication'
            })
        }
    });
}

export default authMiddleware