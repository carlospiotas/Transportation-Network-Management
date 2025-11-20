import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

import ICamiaoRepo from "../services/IRepos/ICamiaoRepo";
import { Camiao } from '../domain/camiao/camiao';
import { CamiaoMap } from '../mappers/CamiaoMap';
import { CamiaoId } from '../domain/camiao/camiaoId';
import { CamiaoMatricula } from '../domain/camiao/camiaoMatricula';
import { ISoftDeletedDocument, ISoftDeletedModel } from 'mongoose-softdelete-typescript';


@Service()
export default class CamiaoRepo implements ICamiaoRepo {
    private models: any;

    constructor(
        @Inject('camiaoSchema') private CamiaoSchema: ISoftDeletedModel<ICamiaoPersistence & ISoftDeletedDocument>,
    ) { }


    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    /*
        Verificar que camião que se pretende criar nao existe 
    */
    public async exists(camiao: Camiao): Promise<boolean> {

        const idX = camiao.id instanceof CamiaoId ? (<CamiaoId>camiao.id).toValue() : camiao.id;

        const query = { domainId: idX };
        const camiaoDocument = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);

        return !!camiaoDocument === true;
    }

    /*
        Criar Camião
    */
    public async save(Camiao: Camiao): Promise<Camiao> {
        const query = { domainId: Camiao.id.toString() };

        const CamiaoDocument = await this.CamiaoSchema.findOne(query);

        try {
            if (CamiaoDocument === null) {
                const rawCamiao: any = CamiaoMap.toPersistence(Camiao);

                const CamiaoCreated = await this.CamiaoSchema.create(rawCamiao);

                return CamiaoMap.toDomain(CamiaoCreated);
            } else {
                CamiaoDocument.matricula = Camiao.matricula.value;
                CamiaoDocument.tara = Camiao.tara.value;
                CamiaoDocument.capacidadeCarga = Camiao.capacidadeCarga.value;
                CamiaoDocument.cargaTotalBaterias = Camiao.cargaTotalBaterias.value;
                CamiaoDocument.autonomia = Camiao.autonomia.value;
                CamiaoDocument.tempoRecarregamento = Camiao.tempoRecarregamento.value;
                
                await CamiaoDocument.save();
                return Camiao;
            }
        } catch (err) {
            throw err;
        }
    }

    /*
        Listar  Camião por Id (nunca usado)
    */
    public async findById(CamiaoId: string): Promise<Camiao> {

        const idX = CamiaoId;

        const query = { domainId: idX };
        const CamiaoRecord = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (CamiaoRecord != null) {
            return CamiaoMap.toDomain(CamiaoRecord);
        }
        else
            return null;
    }

    /*
        Listar  Camião por Matricula
    */
    public async getByMatricula(matriculaa: CamiaoMatricula | string): Promise<Camiao> {

        const query = { matricula: matriculaa };
        const CamiaoRecord = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (CamiaoRecord != null) {
            return CamiaoMap.toDomain(CamiaoRecord);
        }
        else
            return null;
    }

    /*
        Listar Todos os Camiões
    */
    public async getAll (): Promise<Array<Camiao>>{
        const query = {};
        const camioesRecords = await this.CamiaoSchema.find(query as FilterQuery<ICamiaoPersistence & Document>);
    
        if( camioesRecords != null) {
          let camioes: Array<Camiao> = [];
          camioesRecords.forEach(async function (camiaoRecord){
            camioes.push(await CamiaoMap.toDomain(camiaoRecord))
          })
          return camioes
        }
        else
          return null;
    }

    /*
        Eliminar Camião por Id (nunca usado)
    */
    public async deleteById(id: string): Promise<Camiao> {

        const query = { domainId: id };
        const caminhoDeleted = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (caminhoDeleted != null) {
            await this.CamiaoSchema.deleteOne(query as FilterQuery<ICamiaoPersistence & Document>);
            return CamiaoMap.toDomain(caminhoDeleted);
        }
        return null;
    }

    /*
        Eliminar Camião por Matricula
    */
    public async deleteByMatricula(matricula: string): Promise<Camiao> {
        const query = { matricula: matricula };
        const camiaoDeleted = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (camiaoDeleted != null) {
            await this.CamiaoSchema.deleteOne(query as FilterQuery<ICamiaoPersistence & Document>);
            return CamiaoMap.toDomain(camiaoDeleted);
        }
        return null;
    }

    /*
        Inibir um Camião
    */
    public async softDeleteCamiao(matricula: string): Promise<Camiao> {
        const query = { matricula: matricula };
        const camiaoDeleted = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (camiaoDeleted != null) {
            await this.CamiaoSchema.softDelete(query as FilterQuery<ICamiaoPersistence & Document>);
            return CamiaoMap.toDomain(camiaoDeleted);
        }
        return null;
    }

    /*
        Listar Camiões Inibidos 
    */
    public async getCamioesInibidos (): Promise<Array<Camiao>>{
        const query = { isDeleted: true };
        const camioesRecords = await this.CamiaoSchema.find(query as FilterQuery<ICamiaoPersistence & Document>);
    
        if( camioesRecords != null) {
          let camioes: Array<Camiao> = [];
          camioesRecords.forEach(async function (camiaoRecord){
            camioes.push(await CamiaoMap.toDomain(camiaoRecord))
          })
          return camioes
        }
        else
          return null;
    }

    /*
        Restaurar Camião Inibido
    */
    public async restoreSoftDeleteCamiao(matricula: string): Promise<Camiao> {
        const query = { matricula: matricula, isDeleted: true };
        const camiaoDeleted = await this.CamiaoSchema.findOne(query as FilterQuery<ICamiaoPersistence & Document>);
        if (camiaoDeleted != null) {
            await this.CamiaoSchema.restore(query as FilterQuery<ICamiaoPersistence & Document>);
            return CamiaoMap.toDomain(camiaoDeleted);
        }
        return null;
    }
}