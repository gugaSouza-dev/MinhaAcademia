const Academia = require('../models/Academia');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');

module.exports = {

    //Registra um usuario novo
    async Registro(req, res){
        const { email, senha, nome_acad, adm} = req.body;

        try {
            if (email | senha == null) 
                return res.status(400).send({error: 'Campos nao preenchidos'})

            if (await Academia.findOne({email}))
                return res.status(400).send({error: 'Usuario ja existe'});
            
            const academia = await Academia.create({email, senha, nome_acad, adm});
            
            academia.senha = undefined;
            
            const token = jwt.sign({id: academia.id, adm: academia.adm}, authConfig.secret, {
                expiresIn: 28800,
            });

            return res.send({token, academia});

        } catch (error) {
            return res.status(400).send({error: 'Erro no registro'});
        }
    },

    //Loga o usuario retornando o token e a academia
    async Login(req, res){
        const {email, senha} = req.body;
        try {
            const academia = await Academia.findOne({email}).select('+senha');
            if(!academia)
            return res.status(400).send({error: 'Usuario nao encontrado'});

            if(!bcrypt.compareSync(senha, academia.senha))
            return res.status(400).send({error: 'Senha invalida'});

            academia.senha = undefined;

            const token = jwt.sign({id: academia.id, adm: academia.adm}, authConfig.secret, {
                expiresIn: 28800,
            });

            return res.send({token, academia});
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: 'Erro na autenticaçao'});
        }
    }
}