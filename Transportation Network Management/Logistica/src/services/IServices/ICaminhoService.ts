import { Result } from "../../core/logic/Result";
import { Caminho } from "../../domain/caminho/Caminho";
import ICaminhoDTO from "../../dto/ICaminhoDTO";

export default interface ICaminhoService {
    createCaminho(DTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>>;
    checkArmazemId(id: string): Promise<boolean>;
    updateCaminho(caminhoDTO: ICaminhoDTO, id: string): Promise<Result<ICaminhoDTO>>;
    partialUpdateCaminho(caminhoDTO: ICaminhoDTO, id: string): Promise<Result<ICaminhoDTO>>;
    getById(id: string): Promise<Result<ICaminhoDTO>>;
    listarTodosCaminhos(): Promise<Result<ICaminhoDTO[]>>;
    listarPorIdArmazemOrigem(idArmazemOrigem: string): Promise<Result<ICaminhoDTO[]>>;
    listarPorIdArmazemDestino(idArmazemDestino: string): Promise<Result<ICaminhoDTO[]>>;
    deleteById(id: string): Promise<Result<ICaminhoDTO>>;
    listarTodosCaminhosPaginacao(pagina:number): Promise<Result<ICaminhoDTO[]>>;
    listarPorIdArmazemOrigemPaginacao(idArmazemOrigem: string, pagina:number): Promise<Result<ICaminhoDTO[]>>;
    listarPorIdArmazemDestinoPaginacao(idArmazemDestino: string, pagina:number): Promise<Result<ICaminhoDTO[]>>;
}
