const jwt = require('jsonwebtoken')
class JWT{

    generateToken(id){

        let token = jwt.sign({_id : id},process.env.JWT_SECRET,{expiresIn : '15d'});
        return token;
    }

    verifyToken(token){

        try{

            
            let data = jwt.verify(token,process.env.JWT_SECRET);
            
            return data;
            
        }

        catch(err){

            return null;
        }
    }
}

module.exports = new JWT();