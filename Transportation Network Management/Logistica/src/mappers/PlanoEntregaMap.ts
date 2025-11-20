import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICamiaoPersistence } from "../dataschema/ICamiaoPersistence";

import IPlanoEntregaDTO from "../dto/IPlanoEntregaDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { PlanoEntrega } from "../domain/planoEntrega/planoEntrega";

export class PlanoEntregaMap extends Mapper<PlanoEntrega> {

  public static toDTO( plano: PlanoEntrega): IPlanoEntregaDTO {
    return {
      id: plano.id.toString(),
      camiaoMatricula: plano.camiaoMatricula,
      caminho: plano.caminho,
      date: plano.data,
      entregas:plano.entregas
    } as IPlanoEntregaDTO;
  }
/*
  public static toDomain (camiao: any | Model<ICamiaoPersistence & Document>): Camiao {
    const camiaoOrError = Camiao.create(
      camiao,
      new UniqueEntityID(camiao.domainId))

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';
    
    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }
  */

  public static async toDomain (raw: any): Promise<PlanoEntrega> {
    
    const camiaoOrError = PlanoEntrega.create({
      camiaoMatricula: raw.camiaoMatricula,
      caminho: raw.caminho,
      data: raw.data,
      entregas: raw.entregas
    }, new UniqueEntityID(raw.domainId))

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence (plano: PlanoEntrega): any {
    const a = {
      domainId: plano.id.toString(),
      camiaoMatricula: plano.camiaoMatricula,
      caminho: plano.caminho,
      data: plano.data,
      entregas: plano.entregas
    }
    return a;
  }
}