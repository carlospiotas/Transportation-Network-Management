import { Service, Inject } from 'typedi';
import config from "../../config";
import ICaminhoDTO from '../dto/ICaminhoDTO';
import { Caminho } from "../domain/caminho/Caminho";
import ICaminhoRepo from '../services/IRepos/ICaminhoRepo';
import IArmazemRepo from '../services/IRepos/IArmazemRepo';
import ICaminhoService from './IServices/ICaminhoService';
import { Result } from "../core/logic/Result";
import { CaminhoMap } from "../mappers/CaminhoMap";
import { CaminhoEnergiaNecessariaKWh } from '../domain/caminho/CaminhoEnergiaNecessariaKWh';
import { CaminhoTempoDeslocacaoMin } from '../domain/caminho/CaminhoTempoDeslocacaoMin';
import { CaminhoDistanciaArmazens } from '../domain/caminho/CaminhoDistanciaArmazens';

@Service()
export default class CaminhoService implements ICaminhoService {

    constructor(
        @Inject(config.repos.caminho.name) private CaminhoRepo: ICaminhoRepo,
        @Inject(config.repos.armazem.name) private ArmazemRepo: IArmazemRepo
    ) { }


    public async createCaminho(CaminhoDTO: ICaminhoDTO): Promise<Result<ICaminhoDTO>> {
        try {

            const CaminhoOrError = await Caminho.create({
                energiaNecessariaKWh: CaminhoEnergiaNecessariaKWh.create(CaminhoDTO.energiaNecessariaKWh).getValue(),
                tempoDeslocacaoMin: CaminhoTempoDeslocacaoMin.create(CaminhoDTO.tempoDeslocacaoMin).getValue(),
                distanciaEntreArmazens: CaminhoDistanciaArmazens.create(CaminhoDTO.distanciaEntreArmazens).getValue(),
                idArmazemDestino: CaminhoDTO.idArmazemDestino,
                idArmazemOrigem: CaminhoDTO.idArmazemOrigem
            });

            if (CaminhoOrError.isFailure) {
                return Result.fail<ICaminhoDTO>(CaminhoOrError.errorValue());
            }

            const CaminhoResult = CaminhoOrError.getValue();

            await this.CaminhoRepo.save(CaminhoResult);

            const CaminhoDTOResult = CaminhoMap.toDTO(CaminhoResult) as ICaminhoDTO;
            return Result.ok<ICaminhoDTO>(CaminhoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateCaminho(caminhoDTO: ICaminhoDTO, id: string): Promise<Result<ICaminhoDTO>> {
        try {
            const caminho = await this.CaminhoRepo.findByDomainId(id);

            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Caminho not found");
            }
            else {
                this.checkArmazemId(caminhoDTO.idArmazemDestino);
                this.checkArmazemId(caminhoDTO.idArmazemOrigem);
                //caminho.name = caminhoDTO.name;
                caminho.distanciaEntreArmazens = CaminhoDistanciaArmazens.create(caminhoDTO.distanciaEntreArmazens).getValue();
                caminho.tempoDeslocacaoMin = CaminhoTempoDeslocacaoMin.create(caminhoDTO.tempoDeslocacaoMin).getValue();
                caminho.energiaNecessariaKWh = CaminhoEnergiaNecessariaKWh.create(caminhoDTO.energiaNecessariaKWh).getValue();
                caminho.idArmazemDestino = caminhoDTO.idArmazemDestino;
                caminho.idArmazemOrigem = caminhoDTO.idArmazemOrigem;
                await this.CaminhoRepo.save(caminho);

                const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
                return Result.ok<ICaminhoDTO>(caminhoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async partialUpdateCaminho(caminhoDTO: ICaminhoDTO, id: string): Promise<Result<ICaminhoDTO>> {
        try {
            const caminho = await this.CaminhoRepo.findByDomainId(id);

            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Caminho not found");
            }
            else {
                //caminho.name = caminhoDTO.name;
                if (caminhoDTO.distanciaEntreArmazens) caminho.distanciaEntreArmazens = CaminhoDistanciaArmazens.create(caminhoDTO.distanciaEntreArmazens).getValue();
                if (caminhoDTO.tempoDeslocacaoMin) caminho.tempoDeslocacaoMin = CaminhoTempoDeslocacaoMin.create(caminhoDTO.tempoDeslocacaoMin).getValue();
                if (caminhoDTO.energiaNecessariaKWh) caminho.energiaNecessariaKWh = CaminhoEnergiaNecessariaKWh.create(caminhoDTO.energiaNecessariaKWh).getValue();
                if (caminhoDTO.idArmazemDestino) { this.checkArmazemId(caminhoDTO.idArmazemDestino); caminho.idArmazemDestino = caminhoDTO.idArmazemDestino };
                if (caminhoDTO.idArmazemOrigem) { this.checkArmazemId(caminhoDTO.idArmazemOrigem); caminho.idArmazemOrigem = caminhoDTO.idArmazemOrigem; }
                await this.CaminhoRepo.save(caminho);

                const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
                return Result.ok<ICaminhoDTO>(caminhoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }


    async checkArmazemId(id: string): Promise<boolean> {
        const r = await this.ArmazemRepo.exists(id);
        return r;
    }

    public async getById(id: string): Promise<Result<ICaminhoDTO>> {
        try {
            const caminho = await this.CaminhoRepo.findByDomainId(id);

            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Caminho not found");
            }
            else {
                const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
                return Result.ok<ICaminhoDTO>(caminhoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarTodosCaminhos(): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarTodosCaminhos();

            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Sem Caminhos");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarPorIdArmazemOrigem(idArmazemOrigem: string): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarPorIdArmazemOrigem(idArmazemOrigem);

            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Caminhos not found");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarPorIdArmazemDestino(idArmazemDestino: string): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarPorIdArmazemDestino(idArmazemDestino);

            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Caminhos not found");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async deleteById(id: string): Promise<Result<ICaminhoDTO>> {
        try {
            const caminho = await this.CaminhoRepo.deleteById(id);

            if (caminho === null) {
                return Result.fail<ICaminhoDTO>("Nao existe caminho com esse id.");
            }
            else {
                const caminhoDTOResult = CaminhoMap.toDTO(caminho) as ICaminhoDTO;
                return Result.ok<ICaminhoDTO>(caminhoDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarTodosCaminhosPaginacao(pagina: number): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarTodosCaminhosPaginacao(pagina);

            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Sem Caminhos");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarPorIdArmazemOrigemPaginacao(idArmazemOrigem: string, pagina: number): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarPorIdArmazemOrigemPaginacao(idArmazemOrigem, pagina);
            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Caminhos not found");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async listarPorIdArmazemDestinoPaginacao(idArmazemDestino: string, pagina: number): Promise<Result<ICaminhoDTO[]>> {
        try {
            const caminhos = await this.CaminhoRepo.listarPorIdArmazemDestinoPaginacao(idArmazemDestino, pagina);

            if (caminhos === null) {
                return Result.fail<ICaminhoDTO[]>("Caminhos not found");
            }
            else {
                let caminhosResult: Array<ICaminhoDTO> = [];
                caminhos.forEach(function (caminho) {
                    caminhosResult.push(CaminhoMap.toDTO(caminho) as ICaminhoDTO)
                });
                return Result.ok<ICaminhoDTO[]>(caminhosResult)
            }
        } catch (e) {
            throw e;
        }
    }
}
