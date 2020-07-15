const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).send({error: 'Token nao enviado'});
    

    const parts = authHeader.split(' ');

    if (!parts.length === 2) 
        return res.status(401).send({error: 'Erro no Token'});

    
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) 
        return res.status(401).send({error: 'Token malformated'});

    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if (err) {
            return res.status(401).send({error: 'Token invalid'});
        }

        req.id = decoded.id;
        req.adm = decoded.adm;

        return next();
        
    })
}