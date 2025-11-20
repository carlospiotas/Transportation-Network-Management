import { Request, Response, NextFunction } from 'express';

export default interface ICaminhoController {
    createCaminho(req: Request, res: Response, next: NextFunction);
    updateCaminho(req: Request, res: Response, next: NextFunction);
    partialUpdateCaminho(req: Request, res: Response, next: NextFunction);
    getById(req: Request, res: Response, next: NextFunction);
    listarTodosCaminhos(req: Request, res: Response, next: NextFunction);
    listarPorIdArmazemOrigem(req: Request, res: Response, next: NextFunction);
    listarPorIdArmazemDestino(req: Request, res: Response, next: NextFunction);
    listarTodosCaminhosPaginacao(req: Request, res: Response, next: NextFunction);
    listarPorIdArmazemOrigemPaginacao(req: Request, res: Response, next: NextFunction);
    listarPorIdArmazemDestinoPaginacao(req: Request, res: Response, next: NextFunction);
    deleteById(req: Request, res: Response, next: NextFunction);
}