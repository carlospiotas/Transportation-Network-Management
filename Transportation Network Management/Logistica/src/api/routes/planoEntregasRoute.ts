import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanoEntregasController from '../../controllers/IControllers/IPlanoEntregasController';

import config from "../../../config";
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/planoEntregas', function(req,res , next){middlewares.isGestorLogistica(req,res,next);});
  app.use('/planoEntregas', route);

  const ctrl = Container.get(config.controllers.planoEntregas.name) as IPlanoEntregasController;

  route.get('/:ano-:mes-:dia', function (req, res, next) { ctrl.getPlanoEntregas(req, res, next); });
  route.get('/menorTempo/:ano-:mes-:dia', function (req, res, next) { ctrl.getPlanoEntregasMenorTempo(req, res, next); });
  route.get('/maiorMassa/:ano-:mes-:dia', function (req, res, next) { ctrl.getPlanoEntregasMaiorMassa(req, res, next); });
  route.get('/combinada/:ano-:mes-:dia', function (req, res, next) { ctrl.getPlanoEntregasCombinada(req, res, next); });

  route.get('/Paginado/:pagina',function(req, res , next){ctrl.getPaginado(req , res , next)});

  route.get('/planeamentoFrotaCompleta/:ano-:mes-:dia', function (req, res, next) { ctrl.getFrotaPlaneamento(req, res, next); });
  route.get('/planeamentoFrotaAlgoritmoSimulado/:ano-:mes-:dia', function (req, res, next) { ctrl.getFrotaSimulada(req, res, next); });
  route.get('/', function (req, res, next) { ctrl.getAll(req, res, next); })


  route.post('/', function (req, res, next) { ctrl.createPlanoEntrega(req, res, next); })
}