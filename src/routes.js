const { Router } = require('express');
const AcademiaController = require('./controllers/AcademiaController');
const AlunoController = require('./controllers/AlunoController');
const AuthController = require('./controllers/AuthController');
const AdmController = require('./controllers/AdmController');
const authMiddleware = require('./middlewares/auth');


const routes = Router();

routes.post('/registro', AuthController.Registro);

routes.post('/login', AuthController.Login);



routes.use(authMiddleware);


//Funçoes da academia

routes.post('/academias', AcademiaController.AddAcademia);

routes.get('/academias', AcademiaController.DadosAcademia);

routes.put('/academias', AcademiaController.UpdateAcademia);

routes.delete('/academias', AcademiaController.DeleteAcademia);


//Funçoes dos alunos
routes.post('/alunos/:id', AlunoController.AddAluno);

routes.get('/alunos/:id', AlunoController.GetAluno);

routes.get('/alunos/:idAcademia/:idAluno', AlunoController.GetAlunoById);


//Funçoes do adm
routes.get('/academias/adm', AdmController.ListaAcademia);

routes.get('/academias/adm/:id', AdmController.GetAcademiaById);

routes.delete('/academias/adm/:id', AdmController.DeletaQualquerAcademia);

module.exports = routes; 