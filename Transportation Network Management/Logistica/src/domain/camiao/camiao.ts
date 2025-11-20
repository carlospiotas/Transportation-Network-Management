import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { CamiaoId } from "./camiaoId";
import { CamiaoMatricula } from "./camiaoMatricula";
import { CamiaoTara } from "./camiaoTara";
import { CamiaoCapacidadeCarga } from "./camiaoCapacidadeCarga";
import { CamiaoCargaTotalBaterias } from "./camiaoCargaTotalBaterias";
import { CamiaoAutonomia } from "./camiaoAutonomia";
import { CamiaoTempoRecarregamento } from "./camiaoTempoRecarregamento";
import { Guard } from "../../core/logic/Guard";

interface CamiaoProps {
  matricula: CamiaoMatricula;
  tara: CamiaoTara;
  capacidadeCarga: CamiaoCapacidadeCarga;
  cargaTotalBaterias: CamiaoCargaTotalBaterias;
  autonomia: CamiaoAutonomia;
  tempoRecarregamento: CamiaoTempoRecarregamento
}

export class Camiao extends AggregateRoot<CamiaoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get CamiaoId (): CamiaoId {
    return new CamiaoId(this.CamiaoId.toString());
  }

  get matricula (): CamiaoMatricula {
    return this.props.matricula;
  }

  get tara(): CamiaoTara {
    return this.props.tara;
  }

  get capacidadeCarga (): CamiaoCapacidadeCarga {
    return this.props.capacidadeCarga;
  }

  get cargaTotalBaterias (): CamiaoCargaTotalBaterias {
    return this.props.cargaTotalBaterias;
  }

  get autonomia (): CamiaoAutonomia {
    return this.props.autonomia;
  }

  get tempoRecarregamento (): CamiaoTempoRecarregamento {
    return this.props.tempoRecarregamento;
  }

  set tara(value: CamiaoTara) {
    this.props.tara = value;
  }

  set capacidadeCarga(value: CamiaoCapacidadeCarga) {
    this.props.capacidadeCarga = value;
  }

  set cargaTotalBaterias(value: CamiaoCargaTotalBaterias) {
    this.props.cargaTotalBaterias = value;
  }

  set autonomia(value: CamiaoAutonomia) {
    this.props.autonomia = value;
  }

  set tempoRecarregamento(value: CamiaoTempoRecarregamento) {
    this.props.tempoRecarregamento = value;
  }

  private constructor (props: CamiaoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {

    const guardedProps = [
     // { argument: props.matricula, argumentName: 'matricula'},
      { argument: props.tara, argumentName: 'tara '},
      { argument: props.capacidadeCarga, argumentName: 'capacidadeCarga' },
      { argument: props.cargaTotalBaterias, argumentName: 'cargaTotalBaterias' },
      { argument: props.autonomia, argumentName: 'autonomia' },
      { argument: props.tempoRecarregamento, argumentName: 'tempoRecarregamento' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Camiao>(guardResult.message)
    }     
    else {
      const user = new Camiao({
        ...props
      }, id);

      return Result.ok<Camiao>(user);
    }
  }
}
