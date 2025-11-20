import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import camiaoService from '../services/camiaoService';
import camiaoRepo from '../repos/camiaoRepo';
import ArmazemRepo from '../repos/armazemRepo';
import PlanoEntregasService from '../services/planoEntregasService';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


//---------  Schema ------------------------------------------------

  const caminhoSchema = {
    // compare with the approach followed in repos and services
    name: 'caminhoSchema',
    schema: '../persistence/schemas/caminhoSchema',
  };

  const camiaoSchema = {
    // compare with the approach followed in repos and services
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  }

  const planoEntregaSchema = {
    // compare with the approach followed in repos and services
    name: 'planoEntregaSchema',
    schema: '../persistence/schemas/planoEntregaSchema',
  }

//------------------  Controller    ------------------------------------------------
  const caminhoController = {
    name: config.controllers.caminho.name,
    path: config.controllers.caminho.path
  }

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path
  }

  const planoEntregasController = {
    name: config.controllers.planoEntregas.name,
    path: config.controllers.planoEntregas.path
  }

  //------------------------- Repo -------------------------------------------------
  const caminhoRepo = {
    name: config.repos.caminho.name,
    path: config.repos.caminho.path
  }
  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }
  const planoEntregasRepo = {
    name: config.repos.planoEntregas.name,
    path: config.repos.planoEntregas.path
  }

  const armazemRepo = {
    name: config.repos.armazem.name,
    path: config.repos.armazem.path
  }

//---------------------- Service ------------------------------
  const caminhoService = {
    name: config.services.caminho.name,
    path: config.services.caminho.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const planoEntregasService = {
    name: config.services.planoEntregas.name,
    path: config.services.planoEntregas.path
  }
  //--------------------Requests------------------------------

  const armazemRequests = {
    name: config.requests.armazens.name,
    path: config.requests.armazens.path
  }

  dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      caminhoSchema,
      camiaoSchema,
      planoEntregaSchema
      
    ],
    requests: [
      armazemRequests
    ],
    controllers: [
      caminhoController,
      camiaoController,
      planoEntregasController
    ],
    repos: [
      caminhoRepo,
      camiaoRepo,
      planoEntregasRepo,
      armazemRepo
    ],
    services: [
      caminhoService,
      camiaoService,
      planoEntregasService
    ],
    
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
