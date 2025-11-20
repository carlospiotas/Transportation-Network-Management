import { Result } from "../../core/logic/Result";
import  ICamiaoDTO  from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
    createCamiao(roleDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getById(id: string): Promise<Result<ICamiaoDTO>>;
    getByMatricula(matriculaa: string): Promise<Result<ICamiaoDTO>>;
    getAll(): Promise<Result<ICamiaoDTO[]>>;
    getAllInibidos():Promise<Result<ICamiaoDTO[]>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    partialUpdateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    deleteById(id: string): Promise<Result<ICamiaoDTO>>;
    deleteByMatricula(id: string): Promise<Result<ICamiaoDTO>>;
    softDeleteCamiao(id: string): Promise<Result<ICamiaoDTO>>;
    restoreSoftDeleteCamiao(id: string): Promise<Result<ICamiaoDTO>>;
}
