import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ICaminhoPersistence } from '../dataschema/ICaminhoPersistence';

import ICaminhoRepo from "../services/IRepos/ICaminhoRepo";
import { Caminho } from "../domain/caminho/Caminho";
import { CaminhoMap } from "../mappers/CaminhoMap"
import { caminhoId } from "../domain/caminho/caminhoId";
import { CaminhoDistanciaArmazens } from '../domain/caminho/CaminhoDistanciaArmazens';


@Service()
export default class CaminhoRepo implements ICaminhoRepo {
    private models: any;
    /*page limit*/
    private limit: number = 3;

    constructor(
        @Inject('caminhoSchema') private CaminhoSchema: Model<ICaminhoPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(caminho: Caminho): Promise<boolean> {

        const idX = caminho.id instanceof caminhoId ? (<caminhoId>caminho.id).toValue() : caminho.id;

        const query = { domainId: idX };
        const caminhoDocument = await this.CaminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);

        return !!caminhoDocument === true;
    }

    public async save(Caminho: Caminho): Promise<Caminho> {
        const query = { domainId: Caminho.id.toString() };

        const CaminhoDocument = await this.CaminhoSchema.findOne(query);

        try {
            if (CaminhoDocument === null) {
                const rawCaminho: any = CaminhoMap.toPersistence(Caminho);

                const CaminhoCreated = await this.CaminhoSchema.create(rawCaminho);

                return CaminhoMap.toDomain(CaminhoCreated);
            } else {
                CaminhoDocument.tempoDeslocacaoMin = Caminho.tempoDeslocacaoMin.value;
                CaminhoDocument.energiaNecessariaKWh = Caminho.energiaNecessariaKWh.value;
                CaminhoDocument.idArmazemOrigem = Caminho.idArmazemOrigem;
                CaminhoDocument.idArmazemDestino = Caminho.idArmazemDestino;
                CaminhoDocument.distanciaEntreArmazens = Caminho.distanciaEntreArmazens.value;
                await CaminhoDocument.save();

                return Caminho;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(caminhoId: caminhoId | string): Promise<Caminho> {
        const query = { domainId: caminhoId };
        const caminhoRecord = await this.CaminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);

        if (caminhoRecord != null) {
            return CaminhoMap.toDomain(caminhoRecord);
        }
        else
            return null;
    }

    public async listarTodosCaminhos(): Promise<Array<Caminho>> {
        const query = {};
        const caminhoRecords = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>);

        if (caminhoRecords != null) {
            let caminhos: Array<Caminho> = [];
            caminhoRecords.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }

    public async listarPorIdArmazemOrigem(idArmazemOrigem: string): Promise<Array<Caminho>> {
        const query = { idArmazemOrigem: idArmazemOrigem };
        const CaminhosRecord = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>);
       
        if (CaminhosRecord != null) {
            let caminhos: Array<Caminho> = [];
            CaminhosRecord.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }

    public async listarPorIdArmazemDestino(idArmazemDestino: string): Promise<Array<Caminho>> {
        const query = { idArmazemDestino: idArmazemDestino };
        const CaminhosRecord = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>);
        
        if (CaminhosRecord != null) {
            let caminhos: Array<Caminho> = [];
            CaminhosRecord.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }

    public async deleteById(id: string): Promise<Caminho> {

        const query = { domainId: id };
        const caminhoDeleted = await this.CaminhoSchema.findOne(query as FilterQuery<ICaminhoPersistence & Document>);
        if (caminhoDeleted != null) {
            await this.CaminhoSchema.deleteOne(query as FilterQuery<ICaminhoPersistence & Document>);
            return CaminhoMap.toDomain(caminhoDeleted);
        }
        return null;
    }

    public async listarTodosCaminhosPaginacao( pagina: number): Promise<Array<Caminho>> {
        const query = {};
        const skip = this.limit * (pagina - 1);
        const caminhoRecords = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>).skip(skip).limit(this.limit);

        if (caminhoRecords != null) {
            let caminhos: Array<Caminho> = [];
            caminhoRecords.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }

    public async listarPorIdArmazemOrigemPaginacao(idArmazemOrigem: string, pagina: number): Promise<Array<Caminho>> {
        const query = { idArmazemOrigem: idArmazemOrigem };
        const skip = this.limit * (pagina - 1);
        const CaminhosRecord = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>).skip(skip).limit(this.limit);
       
        if (CaminhosRecord != null) {
            let caminhos: Array<Caminho> = [];
            CaminhosRecord.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }

    public async listarPorIdArmazemDestinoPaginacao(idArmazemDestino: string, pagina: number): Promise<Array<Caminho>> {
        const query = { idArmazemDestino: idArmazemDestino };
        const skip = this.limit * (pagina - 1);
        const CaminhosRecord = await this.CaminhoSchema.find(query as FilterQuery<ICaminhoPersistence & Document>).skip(skip).limit(this.limit);
        
        if (CaminhosRecord != null) {
            let caminhos: Array<Caminho> = [];
            CaminhosRecord.forEach(async function (camiaoRecord) {
                caminhos.push(await CaminhoMap.toDomain(camiaoRecord))
            })
            return caminhos
        }
        else
            return null;
    }


}
