import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoCargaTotalBateriasProps {
  value: number;
}

export class CamiaoCargaTotalBaterias extends ValueObject<CamiaoCargaTotalBateriasProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoCargaTotalBateriasProps) {
    super(props);
  }

  public static create (cargaTotalBaterias: number): Result<CamiaoCargaTotalBaterias> {
    if(cargaTotalBaterias <=0){
      return Result.fail<CamiaoCargaTotalBaterias>("Carga Total Baterias tem de ser superior a zero!");
    }
    const guardResult = Guard.againstNullOrUndefined(cargaTotalBaterias, 'cargaTotalBaterias');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoCargaTotalBaterias>(guardResult.message);
    } else {
      return Result.ok<CamiaoCargaTotalBaterias>(new CamiaoCargaTotalBaterias({ value: cargaTotalBaterias }))
    }
  }
}