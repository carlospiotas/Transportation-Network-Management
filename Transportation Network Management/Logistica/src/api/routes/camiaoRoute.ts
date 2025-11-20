import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ICamiaoController from '../../controllers/IControllers/ICamiaoController'; 
import middlewares from '../middlewares';


const route = Router();
var jwt = require('jsonwebtoken');

export default (app: Router) => {
  app.use('/camiao', function(req,res , next){middlewares.isGestorFrota(req,res,next);});
  app.use('/camiao', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

  //Criar camiao
  route.post('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        tara: Joi.number().required(),
        capacidadeCarga: Joi.number().required(),
        cargaTotalBaterias: Joi.number().required(),
        autonomia: Joi.number().required(),
        tempoRecarregamento: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next));

  //Editar Camião
  route.put('/:id',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        matricula: Joi.string().optional(),
        tara: Joi.number().required(),
        capacidadeCarga: Joi.number().required(),
        cargaTotalBaterias: Joi.number().required(),
        autonomia: Joi.number().required(),
        tempoRecarregamento: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next) );

    route.patch('/:id',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        tara: Joi.number().optional(),
        capacidadeCarga: Joi.number().optional(),
        cargaTotalBaterias: Joi.number().optional(),
        autonomia: Joi.number().optional(),
        tempoRecarregamento: Joi.number().optional()
      }),
    }),
    (req, res, next) => ctrl.partialUpdateCamiao(req, res, next) );

    //Listar Camiões por id
    route.get('/:id', function(req,res,next) { ctrl.getById(req,res,next) })

    //Listar Camião por matricula
    route.get('/matricula/:matricula', function(req,res,next) { ctrl.getByMatricula(req,res,next) })

    //Listar todos os Camiões
    route.get('/', function(req,res,next) {ctrl.getAll(req,res,next) })

    //Listar Camioes inibidos
    route.get('/inibidos/:m', function(req,res,next) { ctrl.getInibidos(req,res,next) })

    //Eliminar Camião por id ou matricula
    route.delete('/:id', function (req, res, next) { ctrl.deleteById(req, res, next) })
    route.delete('/matricula/:matricula', function (req, res, next) { ctrl.deleteByMatricula(req, res, next) })
    
    //Inibir Camião
    route.delete('/inibir/:matricula', function (req, res, next) { ctrl.inibirByMatricula(req, res, next) })

    //Desinibir Camião
    route.post('/desinibir/:matricula', function (req, res, next) { ctrl.desinibirByMatricula(req, res, next) })
}