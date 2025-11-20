import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import  ICaminhoDTO from "../dto/ICaminhoDTO";
import { Caminho } from "../domain/caminho/Caminho";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CaminhoEnergiaNecessariaKWh } from "../domain/caminho/CaminhoEnergiaNecessariaKWh";
import { CaminhoTempoDeslocacaoMin } from "../domain/caminho/CaminhoTempoDeslocacaoMin";
import { CaminhoDistanciaArmazens } from "../domain/caminho/CaminhoDistanciaArmazens";
import ArmazemRepo from "../repos/armazemRepo";
import Container from "typedi";
import { ICaminhoPersistence } from "../dataschema/ICaminhoPersistence";

export class CaminhoMap extends Mapper<Caminho> {

    public static toDTO(caminho: Caminho): ICaminhoDTO {
        return {
            id: caminho.id.toString(),
            energiaNecessariaKWh: caminho.energiaNecessariaKWh.value,
            tempoDeslocacaoMin: caminho.tempoDeslocacaoMin.value,
            idArmazemOrigem: caminho.idArmazemOrigem,
            idArmazemDestino: caminho.idArmazemDestino,
            distanciaEntreArmazens: caminho.distanciaEntreArmazens.value
        } as ICaminhoDTO;
    }

    
    public static toDomain2(caminho: any | Model<ICaminhoPersistence & Document>): Caminho {
        const caminhoOrError = Caminho.create(
            caminho,
            new UniqueEntityID(caminho.domainId)
        );

        caminhoOrError.isFailure ? console.log(caminhoOrError.error) : '';

        return caminhoOrError.isSuccess ? caminhoOrError.getValue() : null;
    }
    
    public static async toDomain (raw: any): Promise<Caminho> {
        const caminhoEnergiaNecessariaOrError = CaminhoEnergiaNecessariaKWh.create(raw.energiaNecessariaKWh);
        const caminhoTempoDeslocacaoOrError = CaminhoTempoDeslocacaoMin.create(raw.tempoDeslocacaoMin);
        const idArmazemOrigemOrError = raw.idArmazemOrigem;
        const idArmazemDestinoOrError = raw.idArmazemDestino;
        const caminhoDistanciaArmazensOrError = CaminhoDistanciaArmazens.create(raw.distanciaEntreArmazens);
        
        const caminhoOrError = Caminho.create({
          energiaNecessariaKWh: caminhoEnergiaNecessariaOrError.getValue(),
          tempoDeslocacaoMin: caminhoTempoDeslocacaoOrError.getValue(),
          idArmazemOrigem: idArmazemOrigemOrError,
          idArmazemDestino: idArmazemDestinoOrError,
          distanciaEntreArmazens: caminhoDistanciaArmazensOrError.getValue(),
        }, new UniqueEntityID(raw.domainId))
    
        caminhoOrError.isFailure ? console.log(caminhoOrError.error) : '';
    
        return caminhoOrError.isSuccess ? caminhoOrError.getValue() : null;
    }

    public static toPersistence(caminho: Caminho): any {
        //create no CaminhoSchema
        return {
            domainId: caminho.id.toString(),
            energiaNecessariaKWh: caminho.energiaNecessariaKWh.value,
            tempoDeslocacaoMin: caminho.tempoDeslocacaoMin.value,
            idArmazemOrigem: caminho.idArmazemOrigem,
            idArmazemDestino: caminho.idArmazemDestino,
            distanciaEntreArmazens: caminho.distanciaEntreArmazens.value
        }
    }
}