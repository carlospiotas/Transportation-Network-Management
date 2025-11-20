import { Request, Response, NextFunction } from 'express';

export default interface IPlanoEntregasController {
    getPlanoEntregas(req: Request, res: Response, next: NextFunction);
    getPlanoEntregasMenorTempo(req: Request, res: Response, next: NextFunction);
    getPlanoEntregasMaiorMassa(req: Request, res: Response, next: NextFunction);
    getPlanoEntregasCombinada(req: Request, res: Response, next: NextFunction);
    getPaginado(req: Request, res: Response, next: NextFunction);

    getFrotaPlaneamento(req: Request, res: Response, next: NextFunction);
    getAll(req: Request, res: Response, next: NextFunction);
    getFrotaSimulada(req: Request, res: Response, next: NextFunction);
    createPlanoEntrega(req: Request, res: Response, next: NextFunction);
}