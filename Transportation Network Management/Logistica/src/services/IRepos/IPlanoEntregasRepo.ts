import { PlanoEntrega } from "../../domain/planoEntrega/planoEntrega";

export default interface IPlanoEntregasRepo {
    getPlanoEntregas(data: Date): Promise<string[]>;
    getPlanoEntregasMenorTempo(data: Date): Promise<string[]>;
    getPlanoEntregasMaiorMassa(data: Date): Promise<string[]>;
    getPlanoEntregasCombinado(data: Date): Promise<string[]>;
    getPaginado(page: number): Promise<Array<PlanoEntrega>>;
  
    //get frota completa 
    getFrotaCompleta(data: Date):Promise<string[]>;

    //get armazens, entregas e camioes 
    getArmazens():Promise<string[]>;
    getEntregas(data: Date):Promise<string[]>;
    getCamioes():Promise<string[]>;

    save(plano: PlanoEntrega): Promise<PlanoEntrega>;
    existsDataArmazem(data:Date , matricula:string): Promise<boolean>
    getAll(): Promise<Array<PlanoEntrega>>;
  }