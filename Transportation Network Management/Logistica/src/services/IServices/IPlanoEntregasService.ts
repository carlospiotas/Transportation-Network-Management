import { Result } from "../../core/logic/Result";
import IPlanoEntregasDTO from "../../dto/IPlanoEntregaDTO";

export default interface IPlanoEntregasService {
    getPlanoEntregas(dia: number,mes: number,ano: number);
    getPlanoEntregasMenorTempo(dia: number,mes: number,ano: number);
    getPlanoEntregasMaiorMassa(dia: number,mes: number,ano: number);
    getPlanoEntregasCombinado(dia: number,mes: number,ano: number);
    getPaginado(page: number);

    getFrotaPlaneamento(dia: number,mes: number,ano: number);
    getFrotaSimulada(dia: number,mes: number,ano: number);
    getAll();

    createPlanoEntregas(DTO: IPlanoEntregasDTO): Promise<Result<IPlanoEntregasDTO>>;
}