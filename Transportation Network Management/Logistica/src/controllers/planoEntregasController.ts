import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import IPlanoEntregasController from './IControllers/IPlanoEntregasController';
import IPlanoEntregasService from '../services/IServices/IPlanoEntregasService'
import ICaminhoDTO from '../dto/ICaminhoDTO';

import { Result } from "../core/logic/Result";
import console, { Console } from 'console';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IPlanoEntregasDTO from '../dto/IPlanoEntregaDTO';

@Service()
export default class PlanoEntregasController implements IPlanoEntregasController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.planoEntregas.name) private planoEntregasServiceInstance: IPlanoEntregasService
  ) { }

  public async createPlanoEntrega(req: Request, res: Response, next: NextFunction) {
    try{
      const plano = await this.planoEntregasServiceInstance.createPlanoEntregas(req.body as IPlanoEntregasDTO);
      if (plano.isFailure) {
        return res.status(400).send();
      }

      return res.json(plano.getValue()).status(200).send();

    }catch (e) {
        return next(e);
    }

}

public async getAll(req: Request, res: Response, next: NextFunction) {
  try {
      const camiaoOrError = await this.planoEntregasServiceInstance.getAll() as Result<IPlanoEntregasDTO[]>;

      if (camiaoOrError.isFailure) {
          return res.status(404).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.json(camiaoDTO).status(201);
  }
  catch (e) {
      return next(e);
  }
};

  public async getPlanoEntregas(req: Request, res: Response, next: NextFunction) {
    try{
      const plano = await this.planoEntregasServiceInstance.getPlanoEntregas(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
      if (plano.isFailure) {
        return res.status(400).send();
      }

      return res.json(plano.getValue()).status(200).send();

    }catch (e) {
        return next(e);
    }

}

public async getPlanoEntregasMenorTempo(req: Request, res: Response, next: NextFunction) {
  try{
    const plano = await this.planoEntregasServiceInstance.getPlanoEntregasMenorTempo(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
    if (plano.isFailure) {
      return res.status(404).send();
    }

    return res.json(plano).status(200).send();

  //return res.status(200).send();
  }catch (e) {
      return next(e);
  }
}
public async getPlanoEntregasMaiorMassa(req: Request, res: Response, next: NextFunction) {
  try{
    const plano = await this.planoEntregasServiceInstance.getPlanoEntregasMaiorMassa(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
    if (plano.isFailure) {
      return res.status(404).send();
    }

    return res.json(plano).status(200).send();

  //return res.status(200).send();
  }catch (e) {
      return next(e);
  }
}
public async getPlanoEntregasCombinada(req: Request, res: Response, next: NextFunction) {
  try{
    const plano = await this.planoEntregasServiceInstance.getPlanoEntregasCombinado(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
    if (plano.isFailure) {
      return res.status(404).send();
    }

    return res.json(plano).status(200).send();

  //return res.status(200).send();
  }catch (e) {
      return next(e);
  }
}

private async getPagina(plano , pagina , limite , totalItems){
  const currentPage = pagina ? +pagina : 0;
    const totalPages = Math.ceil(totalItems / limite);
    const pageSize = limite;

    return { totalItems, totalPages, currentPage, pageSize, plano };

}

public async getPaginado(req: Request, res: Response, next: NextFunction){
  try{
    const plano = await this.planoEntregasServiceInstance.getPaginado(Number(req.params.pagina))as Result<IPlanoEntregasDTO[]>;
    if (plano.isFailure) {
      return res.status(404).send();
    }

    const planoDTO = plano.getValue();
    const totalItems = await (await this.planoEntregasServiceInstance.getAll()).getValue().length;
    const response = await this.getPagina(planoDTO, req.params.pagina , config.page_limit,totalItems);
    console.log(response);


    return res.send(response).status(201);

  //return res.status(200).send();
  }catch (e) {
      return next(e);
  }
}



public async getFrotaPlaneamento(req: Request, res: Response, next: NextFunction) {
  try{
      const planoFrota = await this.planoEntregasServiceInstance.getFrotaPlaneamento(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
      if (planoFrota.isFailure) {
        return res.status(400).send();
      }

      return res.json(planoFrota.getValue()).status(200).send();

    }catch (e) {
        return next(e);
    }

}
public async getFrotaSimulada(req: Request, res: Response, next: NextFunction) {
  try{
      const planoFrota = await this.planoEntregasServiceInstance.getFrotaSimulada(Number(req.params.dia),Number(req.params.mes),Number(req.params.ano));
      if (planoFrota.isFailure) {
        return res.status(400).send();
      }

      return res.json(planoFrota.getValue()).status(200).send();

    }catch (e) {
        return next(e);
    }
  }
}