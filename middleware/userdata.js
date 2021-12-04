const jwt = require('jsonwebtoken')

//JWT SEC
const JWT_SEC = "guneet";

const userData = (req, res, next) => {
    let success= false
    const id = req.header('auth-token');
    if (!id) {
        return res.status(401).send({ success,message: "You are not authorised" })
    }
    try {
        const decode = jwt.verify(id, JWT_SEC)
        req.user= decode.id
        next()
    } catch (err) {
        res.status(401).send({ success,message: "Problem with token" })
    }
    
}


    
module.exports = userData