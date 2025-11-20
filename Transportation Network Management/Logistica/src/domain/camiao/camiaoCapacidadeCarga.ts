
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoCapacidadeCargaProps {
  value: number;
}

export class CamiaoCapacidadeCarga extends ValueObject<CamiaoCapacidadeCargaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoCapacidadeCargaProps) {
    super(props);
  }

  public static create (capacidadeCarga: number): Result<CamiaoCapacidadeCarga> {
    if(capacidadeCarga <=0){
      return Result.fail<CamiaoCapacidadeCarga>("Capacidade de Carga tem de ser superior a zero!");
    }
    const guardResult = Guard.againstNullOrUndefined(capacidadeCarga, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoCapacidadeCarga>(guardResult.message);
    } else {
      return Result.ok<CamiaoCapacidadeCarga>(new CamiaoCapacidadeCarga({ value: capacidadeCarga }))
    }
  }
}