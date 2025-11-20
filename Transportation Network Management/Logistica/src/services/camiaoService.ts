import { Service, Inject } from 'typedi';
import config from "../../config";
import  ICamiaoDTO  from '../dto/ICamiaoDTO';
import { Camiao } from "../domain/camiao/camiao";
import ICamiaoRepo from './IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import { Result } from "../core/logic/Result";
import { CamiaoMap } from '../mappers/CamiaoMap';
import { CamiaoMatricula } from '../domain/camiao/camiaoMatricula';
import { CamiaoTara } from '../domain/camiao/camiaoTara';
import { CamiaoCapacidadeCarga } from '../domain/camiao/camiaoCapacidadeCarga';
import { CamiaoCargaTotalBaterias } from '../domain/camiao/camiaoCargaTotalBaterias';
import { CamiaoAutonomia } from '../domain/camiao/camiaoAutonomia';
import { CamiaoTempoRecarregamento } from '../domain/camiao/camiaoTempoRecarregamento';

@Service()
export default class CamiaoService implements ICamiaoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo: ICamiaoRepo
    ) {}
  

    public async getCamiao(camiaoId: string): Promise<Result<ICamiaoDTO>> {
        try {
            const Camiao = await this.camiaoRepo.findById(camiaoId);

            if (Camiao === null) {
                return Result.fail<ICamiaoDTO>("Camiao not found");
            }
            else {
                const CamiaoDTOResult = CamiaoMap.toDTO(Camiao) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(CamiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }


    public async createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        try {
           
            const CamiaoOrError = await Camiao.create({
                matricula: CamiaoMatricula.create(camiaoDTO.matricula).getValue(),
                tara: CamiaoTara.create(camiaoDTO.tara).getValue(),
                capacidadeCarga: CamiaoCapacidadeCarga.create(camiaoDTO.capacidadeCarga).getValue(),
                cargaTotalBaterias: CamiaoCargaTotalBaterias.create(camiaoDTO.cargaTotalBaterias).getValue(),
                autonomia: CamiaoAutonomia.create(camiaoDTO.autonomia).getValue(),
                tempoRecarregamento: CamiaoTempoRecarregamento.create(camiaoDTO.tempoRecarregamento).getValue(),
            });
               
            if (CamiaoOrError.isFailure) {
                return Result.fail<ICamiaoDTO>(CamiaoOrError.errorValue());
            }

            const CamiaoResult = CamiaoOrError.getValue();

            await this.camiaoRepo.save(CamiaoResult);

            const CamiaoDTOResult = CamiaoMap.toDTO(CamiaoResult) as ICamiaoDTO;
            return Result.ok<ICamiaoDTO>(CamiaoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        try {
          const camiao = await this.camiaoRepo.findById(camiaoDTO.id);
    
          if (camiao === null) {
            return Result.fail<ICamiaoDTO>("Camiao not found");
          }
          else {
            camiao.tara = CamiaoTara.create(camiaoDTO.tara).getValue();
            camiao.capacidadeCarga = CamiaoCapacidadeCarga.create(camiaoDTO.capacidadeCarga).getValue();
            camiao.cargaTotalBaterias = CamiaoCargaTotalBaterias.create(camiaoDTO.cargaTotalBaterias).getValue();
            camiao.autonomia = CamiaoAutonomia.create(camiaoDTO.autonomia).getValue();
            camiao.tempoRecarregamento = CamiaoTempoRecarregamento.create(camiaoDTO.tempoRecarregamento).getValue();
            await this.camiaoRepo.save(camiao);
    
            const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
            return Result.ok<ICamiaoDTO>( camiaoDTOResult )
            }
        } catch (e) {
          throw e;
        }
      }

      public async partialUpdateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        try {
          const camiao = await this.camiaoRepo.findById(camiaoDTO.id);
    
          if (camiao === null) {
            return Result.fail<ICamiaoDTO>("Camiao not found");
          }
          else {
            if(camiaoDTO.tara) camiao.tara = CamiaoTara.create(camiaoDTO.tara).getValue();
            if(camiaoDTO.capacidadeCarga) camiao.capacidadeCarga = CamiaoCapacidadeCarga.create(camiaoDTO.capacidadeCarga).getValue();
            if(camiaoDTO.cargaTotalBaterias) camiao.cargaTotalBaterias = CamiaoCargaTotalBaterias.create(camiaoDTO.cargaTotalBaterias).getValue();
            if(camiaoDTO.autonomia) camiao.autonomia = CamiaoAutonomia.create(camiaoDTO.autonomia).getValue();
            if(camiaoDTO.tempoRecarregamento) camiao.tempoRecarregamento = CamiaoTempoRecarregamento.create(camiaoDTO.tempoRecarregamento).getValue();
            await this.camiaoRepo.save(camiao);
    
            const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
            return Result.ok<ICamiaoDTO>( camiaoDTOResult )
            }
        } catch (e) {
          throw e;
        }
      }

      public async getById(id: string): Promise<Result<ICamiaoDTO>> {
        try {
            const camiao = await this.camiaoRepo.findById(id);

            if (camiao === null) {
                return Result.fail<ICamiaoDTO>("Camiao not found");
            }
            else {
                const camiaoDTOResult = CamiaoMap.toDTO(camiao) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(camiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getByMatricula(matricula: string): Promise<Result<ICamiaoDTO>> {
        try {
            const camiao = await this.camiaoRepo.getByMatricula(matricula);

            if (camiao === null) {
                return Result.fail<ICamiaoDTO>("Camiao not found");
            }
            else {
                const camiaoDTOResult = CamiaoMap.toDTO(camiao) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(camiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAll(): Promise<Result<ICamiaoDTO[]>>{

        try {
            const camioes = await this.camiaoRepo.getAll();
      
            if (camioes === null) {
              return Result.fail<ICamiaoDTO[]>("Camiao não encontrado");
            }
            else {
              let camioesResult: Array<ICamiaoDTO> = [];
              camioes.forEach(function (camiao){
                camioesResult.push(CamiaoMap.toDTO(camiao) as ICamiaoDTO)
              });
              return Result.ok<ICamiaoDTO[]>( camioesResult )
              }
          } catch (e) {
            throw e;
          }
    }

    public async getAllInibidos(): Promise<Result<ICamiaoDTO[]>>{
        try {
            const camioes = await this.camiaoRepo.getCamioesInibidos();
      
            if (camioes === null) {
              return Result.fail<ICamiaoDTO[]>("Não existem camiões inibidos");
            }
            else {
              let camioesResult: Array<ICamiaoDTO> = [];
              camioes.forEach(function (camiao){
                camioesResult.push(CamiaoMap.toDTO(camiao) as ICamiaoDTO)
              });
              return Result.ok<ICamiaoDTO[]>( camioesResult )
              }
          } catch (e) {
            throw e;
          }
    }

    public async deleteById(id: string): Promise<Result<ICamiaoDTO>> {
        try {
            const caminho = await this.camiaoRepo.deleteById(id);

            if (caminho === null) {
                return Result.fail<ICamiaoDTO>("Nao existe camiao com esse id.");
            }
            else {
                const caminhoDTOResult = CamiaoMap.toDTO(caminho) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(caminhoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async deleteByMatricula(matricula: string): Promise<Result<ICamiaoDTO>> {
        try {
            const camiaoDelete = await this.camiaoRepo.deleteByMatricula(matricula);

            if (camiaoDelete === null) {
                return Result.fail<ICamiaoDTO>("Nao existe camiao com essa matricula.");
            }
            else {
                const camiaoDTOResult = CamiaoMap.toDTO(camiaoDelete) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(camiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async softDeleteCamiao(matricula: string): Promise<Result<ICamiaoDTO>> {
        try {
            const camiaoDelete = await this.camiaoRepo.softDeleteCamiao(matricula);

            if (camiaoDelete === null) {
                return Result.fail<ICamiaoDTO>("Nao existe camiao com essa matricula.");
            }
            else {
                const camiaoDTOResult = CamiaoMap.toDTO(camiaoDelete) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(camiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
    
    public async restoreSoftDeleteCamiao(matricula: string): Promise<Result<ICamiaoDTO>> {
        try {
            const camiao = await this.camiaoRepo.restoreSoftDeleteCamiao(matricula);
            
            if (camiao === null) {
                return Result.fail<ICamiaoDTO>("Nao existe camiao com essa matricula.");
            }
            else {
                await this.camiaoRepo.save(camiao);
                const camiaoDTOResult = CamiaoMap.toDTO(camiao) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>(camiaoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
      
}
