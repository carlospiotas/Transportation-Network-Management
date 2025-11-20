import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICamiaoPersistence } from "../dataschema/ICamiaoPersistence";

import ICamiaoDTO from "../dto/ICamiaoDTO";
import { Camiao } from '../domain/camiao/camiao';

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CamiaoMatricula } from "../domain/camiao/camiaoMatricula";
import { CamiaoTara } from "../domain/camiao/camiaoTara";
import { CamiaoCapacidadeCarga } from "../domain/camiao/camiaoCapacidadeCarga";
import { CamiaoCargaTotalBaterias } from "../domain/camiao/camiaoCargaTotalBaterias";
import { CamiaoAutonomia } from "../domain/camiao/camiaoAutonomia";
import { CamiaoTempoRecarregamento } from "../domain/camiao/camiaoTempoRecarregamento";

export class CamiaoMap extends Mapper<Camiao> {

  public static toDTO( camiao: Camiao): ICamiaoDTO {
    return {
      id: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidadeCarga: camiao.capacidadeCarga.value,
      cargaTotalBaterias: camiao.cargaTotalBaterias.value,
      autonomia: camiao.autonomia.value,
      tempoRecarregamento: camiao.tempoRecarregamento.value
    } as ICamiaoDTO;
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

  public static async toDomain (raw: any): Promise<Camiao> {
    const camiaoMatriculaOrError = CamiaoMatricula.create(raw.matricula);
    const camiaoTaraOrError = CamiaoTara.create(raw.tara);
    const camiaoCapacidadeOrError = CamiaoCapacidadeCarga.create(raw.capacidadeCarga);
    const camiaoCargaBateriaOrError = CamiaoCargaTotalBaterias.create(raw.cargaTotalBaterias);
    const camiaoAutonomiaOrError = CamiaoAutonomia.create(raw.autonomia);
    const camiaoTempoCarregamentoOrError = CamiaoTempoRecarregamento.create(raw.tempoRecarregamento);
    
    const camiaoOrError = Camiao.create({
      matricula: camiaoMatriculaOrError.getValue(),
      tara: camiaoTaraOrError.getValue(),
      capacidadeCarga: camiaoCapacidadeOrError.getValue(),
      cargaTotalBaterias: camiaoCargaBateriaOrError.getValue(),
      autonomia: camiaoAutonomiaOrError.getValue(),
      tempoRecarregamento: camiaoTempoCarregamentoOrError.getValue()
    }, new UniqueEntityID(raw.domainId))

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence (camiao: Camiao): any {
    const a = {
      domainId: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidadeCarga: camiao.capacidadeCarga.value,
      cargaTotalBaterias: camiao.cargaTotalBaterias.value,
      autonomia: camiao.autonomia.value,
      tempoRecarregamento: camiao.tempoRecarregamento.value
    }
    return a;
  }
}