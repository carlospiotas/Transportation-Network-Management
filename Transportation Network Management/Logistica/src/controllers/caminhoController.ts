import { Request, Response, NextFunction } from 'express';
import Container, { Inject, Service } from 'typedi';
import config from "../../config";

import ICaminhoController from "./IControllers/ICaminhoController";
import ICaminhoService from '../services/IServices/ICaminhoService';
import ICaminhoDTO from '../dto/ICaminhoDTO';

import { Result } from "../core/logic/Result";
import console, { Console } from 'console';

@Service()
export default class CaminhoController implements ICaminhoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.caminho.name) private caminhoServiceInstance: ICaminhoService
  ) { }

  public async createCaminho(req: Request, res: Response, next: NextFunction) {

    try {
      var origemB = await this.caminhoServiceInstance.checkArmazemId(req.body.idArmazemOrigem);
      var destinoB = await this.caminhoServiceInstance.checkArmazemId(req.body.idArmazemDestino);

      if (!(origemB && destinoB)) {
        return res.status(402).send("Pelo menos um destes Armazéns não exite. VERIFIQUE");
      }
      const caminhoOrError = await this.caminhoServiceInstance.createCaminho(req.body as ICaminhoDTO) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();

      return res.json(caminhoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateCaminho(req: Request, res: Response, next: NextFunction) {
    try {

      var origemB = await this.caminhoServiceInstance.checkArmazemId(req.body.idArmazemOrigem);
      var destinoB = await this.caminhoServiceInstance.checkArmazemId(req.body.idArmazemDestino);

      if (!(origemB && destinoB)) {
        return res.status(402).send("Pelo menos um destes Armazéns não exite. VERIFIQUE");
      }
      const caminhoOrError = await this.caminhoServiceInstance.updateCaminho(req.body as ICaminhoDTO, req.params.id) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(201).json(caminhoDTO);
    }
    catch (e) {
      return next(e);
    }
  };

  public async partialUpdateCaminho(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.partialUpdateCaminho(req.body as ICaminhoDTO, req.params.id) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.status(201).json(caminhoDTO);
    }
    catch (e) {
      return next(e);
    }
  };


  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.getById(req.params.id);

      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(200);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listarTodosCaminhos(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarTodosCaminhos() as Result<ICaminhoDTO[]>;

      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarPorIdArmazemOrigem(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarPorIdArmazemOrigem(req.params.idArmazemOrigem);

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listarPorIdArmazemDestino(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarPorIdArmazemDestino(req.params.idArmazemDestino);

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.deleteById(req.params.id) as Result<ICaminhoDTO>;

      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      return res.json(caminhoDTO).status(200);
    }
    catch (e) {
      return next(e);
    }
  }

  public async getPagingData(data, page, limit, totalItems) {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const pageSize = limit;

    return { totalItems, totalPages, currentPage, pageSize, data };
  };

  public async listarTodosCaminhosPaginacao(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarTodosCaminhosPaginacao(Number(req.params.page)) as Result<ICaminhoDTO[]>;


      if (caminhoOrError.isFailure) {
        return res.status(404).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      const totalItems = await (await this.caminhoServiceInstance.listarTodosCaminhos()).getValue().length;
      const response = await this.getPagingData(caminhoDTO, req.params.page, config.page_limit, totalItems);
      return res.send(response).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarPorIdArmazemOrigemPaginacao(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarPorIdArmazemOrigemPaginacao(req.params.idArmazemOrigem, Number(req.params.page));

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      const totalItems = await (await this.caminhoServiceInstance.listarPorIdArmazemOrigem(req.params.idArmazemOrigem)).getValue().length;
      const response = await this.getPagingData(caminhoDTO, req.params.page, config.page_limit, totalItems);
      console.log(response);
      return res.send(response).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listarPorIdArmazemDestinoPaginacao(req: Request, res: Response, next: NextFunction) {
    try {
      const caminhoOrError = await this.caminhoServiceInstance.listarPorIdArmazemDestinoPaginacao(req.params.idArmazemDestino, Number(req.params.page));

      if (caminhoOrError.isFailure) {
        return res.status(402).send();
      }

      const caminhoDTO = caminhoOrError.getValue();
      const totalItems = await (await this.caminhoServiceInstance.listarPorIdArmazemDestino(req.params.idArmazemDestino)).getValue().length;
      const response = await this.getPagingData(caminhoDTO, req.params.page, config.page_limit, totalItems);
      return res.send(response).status(201);
    }
    catch (e) {
      return next(e);
    }
  };


}
