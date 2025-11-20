import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController {
    createCamiao(req: Request, res: Response, next: NextFunction);
    getById(req: Request, res: Response, next: NextFunction);
    getByMatricula(req: Request, res: Response, next: NextFunction);
    getAll(req: Request, res: Response, next: NextFunction);
    getInibidos(req: Request, res: Response, next: NextFunction);
    updateCamiao(req: Request, res: Response, next: NextFunction);
    partialUpdateCamiao(req: Request, res: Response, next: NextFunction);
    deleteById(req: Request, res: Response, next: NextFunction);
    deleteByMatricula(req: Request, res: Response, next: NextFunction);
    inibirByMatricula(req: Request, res: Response, next: NextFunction);
    desinibirByMatricula(req: Request, res: Response, next: NextFunction);
}