import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICaminhoController from '../../controllers/IControllers/ICaminhoController';

import config from "../../../config";
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/caminhos', function(req,res , next){middlewares.isGestorLogistica(req,res,next);});
  app.use('/caminhos', route);

  const ctrl = Container.get(config.controllers.caminho.name) as ICaminhoController;

  route.post('',
    celebrate({
      body: Joi.object({
        energiaNecessariaKWh: Joi.number().required(),
        tempoDeslocacaoMin: Joi.number().required(),
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distanciaEntreArmazens: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createCaminho(req, res, next));

  route.put('/:id',
    celebrate({
      body: Joi.object({
        //id: Joi.string().required(),
        energiaNecessariaKWh: Joi.number().required(),
        tempoDeslocacaoMin: Joi.number().required(),
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distanciaEntreArmazens: Joi.number().required()
      }),
    }), (req, res, next) => ctrl.updateCaminho(req, res, next));

    route.patch('/:id',
    celebrate({
      body: Joi.object({
        energiaNecessariaKWh: Joi.number().optional(),
        tempoDeslocacaoMin: Joi.number().optional(),
        idArmazemOrigem: Joi.string().optional(),
        idArmazemDestino: Joi.string().optional(),
        distanciaEntreArmazens: Joi.number().optional()
      }),
    }),
    (req, res, next) => ctrl.partialUpdateCaminho(req, res, next) );


  route.get('/:id', function (req, res, next) { ctrl.getById(req, res, next); });
  route.get('', function (req, res, next) { ctrl.listarTodosCaminhos(req, res, next); })
  route.get('/listarPorIdArmazenOrigem/:idArmazemOrigem', function (req, res, next) { ctrl.listarPorIdArmazemOrigem(req, res, next); })
  route.get('/listarPorIdArmazenDestino/:idArmazemDestino', function (req, res, next) { ctrl.listarPorIdArmazemDestino(req, res, next); })
  route.get('/listarTodosPaginado/:page', function (req, res, next) { ctrl.listarTodosCaminhosPaginacao(req, res, next); })
  route.get('/listarPorIdArmazenOrigemPaginado/:idArmazemOrigem/:page', function (req, res, next) { ctrl.listarPorIdArmazemOrigemPaginacao(req, res, next); })
  route.get('/listarPorIdArmazenDestinoPaginado/:idArmazemDestino/:page', function (req, res, next) { ctrl.listarPorIdArmazemDestinoPaginacao(req, res, next); })
  route.delete('/:id', function (req, res, next) { ctrl.deleteById(req, res, next) })
}