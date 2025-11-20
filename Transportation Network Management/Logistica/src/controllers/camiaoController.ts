import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ICamiaoDTO from '../dto/ICamiaoDTO';
import ICamiaoService from '../services/IServices/ICamiaoService';
import ICamiaoController from './IControllers/ICamiaoController';
import { Result } from "../core/logic/Result";

@Service()
export default class CamiaoController implements ICamiaoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.camiao.name) private camiaoServiceInstance: ICamiaoService
    ) { }

    /*
        Criar Camião
    */
    public async createCamiao(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if (camiaoOrError.isFailure) {
                return res.status(402).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    /*
        Editar Camião
    */
    public async updateCamiao(req: Request, res: Response, next: NextFunction) {
        try {

            if(req.params.id != req.body.id){
                return res.status(400).send("Id do body nao corresponde ao id dos parametros");
            }
            
            const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if (camiaoOrError.isFailure) {
                return res.status(404).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.status(201).json(camiaoDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async partialUpdateCamiao(req: Request, res: Response, next: NextFunction) {
        try {

            if(req.params.id != req.body.id){
                return res.status(400).send("Id do body nao corresponde ao id dos parametros");
            }            
            
            const camiaoOrError = await this.camiaoServiceInstance.partialUpdateCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if (camiaoOrError.isFailure) {
                return res.status(404).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.status(201).json(camiaoDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    /*
        Listar Camião por ID
    */
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getById(req.params.id);

            if (camiaoOrError.isFailure) {
                return res.status(402).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    /*
        Listar Camião por Matricula 
    */
    public async getByMatricula(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getByMatricula(req.params.matricula);

            if (camiaoOrError.isFailure) {
                return res.status(402).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    /*
        Listar todos os camiões do sistema
    */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getAll() as Result<ICamiaoDTO[]>;

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

    /*
        Listar todos os camiões inibidos do sistema
    */
    public async getInibidos(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.getAllInibidos() as Result<ICamiaoDTO[]>;
    
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

    /*
        Eliminar Camião por ID
    */
    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
          const caminhoOrError = await this.camiaoServiceInstance.deleteById(req.params.id) as Result<ICamiaoDTO>;
    
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

    /*
        Eliminar Camião por Matricula
    */
    public async deleteByMatricula(req: Request, res: Response, next: NextFunction) {
        try {
          const caminhoOrError = await this.camiaoServiceInstance.deleteByMatricula(req.params.matricula) as Result<ICamiaoDTO>;

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

    /*
        Inibir Camião por Matricula
    */
    public async inibirByMatricula(req: Request, res: Response, next: NextFunction) {
        try {
          const caminhoOrError = await this.camiaoServiceInstance.softDeleteCamiao(req.params.matricula) as Result<ICamiaoDTO>;

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

    public async desinibirByMatricula(req: Request, res: Response, next: NextFunction) {
        try {
            const camiaoOrError = await this.camiaoServiceInstance.restoreSoftDeleteCamiao(req.params.matricula);

            if (camiaoOrError.isFailure) {
                return res.status(402).send();
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json(camiaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    

}
