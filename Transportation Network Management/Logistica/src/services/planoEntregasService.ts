import { Service, Inject } from 'typedi';
import config from "../../config";
import IPlanoEntregasRepo from './IRepos/IPlanoEntregasRepo';
import IPlanoEntregasService from './IServices/IPlanoEntregasService';
import { Result } from "../core/logic/Result";
import { AlgoritmoSimulado } from '../utils/AlgoritmoSimulado';
import { allowedNodeEnvironmentFlags } from 'process';
import IPlanoEntregasDTO from '../dto/IPlanoEntregaDTO';
import { PlanoEntrega } from '../domain/planoEntrega/planoEntrega';
import { CamiaoMatricula } from '../domain/camiao/camiaoMatricula';
import { PlanoEntregaMap } from '../mappers/PlanoEntregaMap';


@Service()
export default class PlanoEntregasService implements IPlanoEntregasService {

    constructor(
        @Inject(config.repos.planoEntregas.name) 
            private planoEntregasRepo: IPlanoEntregasRepo,
    ) { }


    public async createPlanoEntregas(PlanoEntregasDTO: IPlanoEntregasDTO): Promise<Result<IPlanoEntregasDTO>> {
        try {

            const CaminhoOrError = await PlanoEntrega.create({
                camiaoMatricula: PlanoEntregasDTO.camiaoMatricula,
                caminho: PlanoEntregasDTO.caminho,
                data: new Date(PlanoEntregasDTO.date),
                entregas: PlanoEntregasDTO.entregas
            });

            if (CaminhoOrError.isFailure) {
                return Result.fail<IPlanoEntregasDTO>(CaminhoOrError.errorValue());
            }

            const CaminhoResult = CaminhoOrError.getValue();

            await this.planoEntregasRepo.save(CaminhoResult);

            const CaminhoDTOResult = PlanoEntregaMap.toDTO(CaminhoResult) as IPlanoEntregasDTO;
            return Result.ok<IPlanoEntregasDTO>(CaminhoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getAll(): Promise<Result<IPlanoEntregasDTO[]>>{

        try {
            const camioes = await this.planoEntregasRepo.getAll();
      
            if (camioes === null) {
              return Result.fail<IPlanoEntregasDTO[]>("Camiao não encontrado");
            }
            else {
              let camioesResult: Array<IPlanoEntregasDTO> = [];
              camioes.forEach(function (camiao){
                camioesResult.push(PlanoEntregaMap.toDTO(camiao) as IPlanoEntregasDTO)
              });
              return Result.ok<IPlanoEntregasDTO[]>( camioesResult )
              }
          } catch (e) {
            throw e;
          }
    }

    public async getPlanoEntregas(dia: number,mes: number,ano: number) {
        try{
        var data = new Date(ano,mes -1,dia,0,0,0,0);
        const plano = await this.planoEntregasRepo.getPlanoEntregas(data);

        if (plano == null){
            return Result.fail<Object>("Ocorreu um erro ao calcular o plano de entregas");
        }else{
            var caminhos =[];
            var lista = await this.planoEntregasRepo.getEntregas(data);

            var object1= {camiaoMatricula: plano[0][0]};
            plano.shift();
            var armazens_entregas= [];
            for (let index = 0; index < plano.length; index++) {
                const element = plano[index];
                
                caminhos.push(element[0]);

                var armazem = {armazem: element[0]};
                var aux = element[1];
                var auxObject = {id:aux[0]};
                var arr=[];
                arr.push(auxObject)
                var entregas = {entregas: arr};
                var objectaux = Object.assign(armazem,entregas);
                armazens_entregas.push(objectaux);
            }

            var listaFinal = [];

            for (let index = 0; index < lista.length; index++) {

                const element = lista[index];  
                var armID = lista[index].indexOf("armazemId");
                const y = armID + 12;

                var string = "Armazem:"+ element.slice(y,y+3) +" "+data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear() ;    
                listaFinal.push(string);
                
            }

            if(!await this.planoEntregasRepo.existsDataArmazem(data,object1.camiaoMatricula)){
              this.createPlanoEntregas({id:"",camiaoMatricula: object1.camiaoMatricula,caminho:caminhos,date:data,entregas:listaFinal})
            }else{
                console.log("Falhou a persistencia");
            }


            var objectarr = {armazens: armazens_entregas};
            var objectfinal = Object.assign(object1,objectarr);
            return Result.ok<Object>(objectfinal);
        }

        }catch (e) {
            throw e;
        }
    }

   

    public async getPlanoEntregasMenorTempo(dia: number, mes: number, ano: number) {
        try{
            var data = new Date(ano,mes -1,dia,0,0,0,0);
            const plano = await this.planoEntregasRepo.getPlanoEntregasMenorTempo(data);
    
            if (plano == null){
                return Result.fail<Object>("Ocorreu um erro ao calcular o plano de entregas");
            }else{
                var object1= {camiaoMatricula: plano[0][0]};
            plano.shift();
            var armazens_entregas= [];
            for (let index = 0; index < plano.length; index++) {
                const element = plano[index];
                var armazem = {armazem: element[0]};
                var aux = element[1];
                var auxObject = {id:aux[0]};
                var arr=[];
                arr.push(auxObject)
                var entregas = {entregas: arr};
                var objectaux = Object.assign(armazem,entregas);
                armazens_entregas.push(objectaux);
            }
            var objectarr = {armazens: armazens_entregas};
            var objectfinal = Object.assign(object1,objectarr);
                return Result.ok<Object>(objectfinal);
            }
    
            }catch (e) {
                throw e;
            }

        
    }
    public async getPlanoEntregasMaiorMassa(dia: number, mes: number, ano: number) {
        try{
            var data = new Date(ano,mes -1,dia,0,0,0,0);
            const plano = await this.planoEntregasRepo.getPlanoEntregasMaiorMassa(data);
    
            if (plano == null){
                return Result.fail<Object>("Ocorreu um erro ao calcular o plano de entregas");
            }else{
                var object1= {camiaoMatricula: plano[0][0]};
            plano.shift();
            var armazens_entregas= [];
            for (let index = 0; index < plano.length; index++) {
                const element = plano[index];
                var armazem = {armazem: element[0]};
                var aux = element[1];
                var auxObject = {id:aux[0]};
                var arr=[];
                arr.push(auxObject)
                var entregas = {entregas: arr};
                var objectaux = Object.assign(armazem,entregas);
                armazens_entregas.push(objectaux);
            }
            var objectarr = {armazens: armazens_entregas};
            var objectfinal = Object.assign(object1,objectarr);
                return Result.ok<Object>(objectfinal);
            }
    
            }catch (e) {
                throw e;
            }
    }
    public async getPlanoEntregasCombinado(dia: number, mes: number, ano: number) {
        try{
            var data = new Date(ano,mes -1,dia,0,0,0,0);
            const plano = await this.planoEntregasRepo.getPlanoEntregasCombinado(data);
    
            if (plano == null){
                return Result.fail<Object>("Ocorreu um erro ao calcular o plano de entregas");
            }else{
                var object1= {camiaoMatricula: plano[0][0]};
            plano.shift();
            var armazens_entregas= [];
            for (let index = 0; index < plano.length; index++) {
                const element = plano[index];
                var armazem = {armazem: element[0]};
                var aux = element[1];
                var auxObject = {id:aux[0]};
                var arr=[];
                arr.push(auxObject)
                var entregas = {entregas: arr};
                var objectaux = Object.assign(armazem,entregas);
                armazens_entregas.push(objectaux);
            }
            var objectarr = {armazens: armazens_entregas};
            var objectfinal = Object.assign(object1,objectarr);
                return Result.ok<Object>(objectfinal);
            }
    
            }catch (e) {
                throw e;
            }
    }

    public async getPaginado(page: number) {
        try {
            const planos = await this.planoEntregasRepo.getPaginado(page);

            if (planos === null) {
                return Result.fail<IPlanoEntregasDTO[]>("Não tem Planos de Entregas");
            }
            else {
                let planosResult: Array<IPlanoEntregasDTO> = [];
                planos.forEach(function (plano) {
                    planosResult.push(PlanoEntregaMap.toDTO(plano) as IPlanoEntregasDTO)
                });
                return Result.ok<IPlanoEntregasDTO[]>(planosResult)
            }
           return null;
        } catch (e) {
            throw e;
        }
    }

    
    //Get ao planeamento da Frota
    public async getFrotaPlaneamento(dia: number, mes: number, ano: number) {
        var data = new Date(ano,mes -1,dia,0,0,0,0);
        var entregasOrdenadas = await this.planoEntregasRepo.getFrotaCompleta(data);
        console.log(entregasOrdenadas);
       
        if (entregasOrdenadas == null){
            return Result.fail<Object>("Ocorreu um erro ao receber planemaneto");
        }
         
        const arrCamioes = await this.planoEntregasRepo.getCamioes();
     
         //=================== Array Camioes =================================
         var camioes = [];
         if (arrCamioes == null){
              return Result.fail<Object>("Ocorreu um erro ao receber camioes");
         }else{
             for (let index = 0; index < arrCamioes.length; index++) {
                 const element = arrCamioes[index];         
                 var camiao = {matricula: element.slice(58,66), cc: 4300};
                 camioes.push(camiao);
             }
         };
        

        //camioes com as entregas carregadas
         let camioes_armazens_entregas;
         var armazens_entregas= [];
        
        //==== Distribuição de entregas pelos camiões ======
            var c=0;
            var arms = [];
            var cam = [];
            var b=0;
            var a = 0;
          
            //Distribuição de Carga
            for (var i=0; i<3; i++){
                for (var j=0; j<entregasOrdenadas.length; j++){
                     a++;
                     if(a < 6){
                         //introduzir entregas no camiao
                         const element = entregasOrdenadas[j];
                         var armazem = {armazem: element[0]};
                         var aux = element[1];
                         var auxObject = {id:aux[0]};
                         var arr=[];
                         arr.push(auxObject)
                         var entregas = {entregas: arr};
                         var objectaux = Object.assign(armazem,entregas);
                         armazens_entregas.push(objectaux);
                         arms[b] = armazens_entregas[j];
 
                         cam[c] = {camiao: camioes[i].matricula, armazens: arms};
                         b++;
                     }
                     //chamar outro camiao
                     if(a == 6){
                         a=0;
                         arms = [];
                         i++;
                         j--;
                         c++;
                         b=0;
                     }    
                }
                j++;  
            }
            camioes_armazens_entregas = {planeamento: cam};
          
         return Result.ok<any>(camioes_armazens_entregas);
    }
  
    //Get do Algoritmo Simulado
    public async getFrotaSimulada(dia: number, mes: number, ano: number) {
        
        var data = new Date(ano,mes -1,dia,0,0,0,0);
        console.log(data);
        const camioes = await this.planoEntregasRepo.getCamioes();
        const armazens = await this.planoEntregasRepo.getArmazens();
        const entregas = await this.planoEntregasRepo.getEntregas(data);
        var camioes_armazens_entregas;
        camioes_armazens_entregas = AlgoritmoSimulado.planeamentoSimulado(armazens, entregas, camioes);
        
        return Result.ok<Object>(camioes_armazens_entregas.getValue());
    }

}
