import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaminhoDistanciaArmazensProps {
  value: number;
}

export class CaminhoDistanciaArmazens extends ValueObject<CaminhoDistanciaArmazensProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CaminhoDistanciaArmazensProps) {
    super(props);
  }

  public static create (caminhoDistanciaArmazens: number): Result<CaminhoDistanciaArmazens> {
    const guardResult = Guard.againstNullOrUndefined(caminhoDistanciaArmazens, 'caminhoDistanciaArmazens');
    if (!guardResult.succeeded || caminhoDistanciaArmazens < 0) {
      return Result.fail<CaminhoDistanciaArmazens>(guardResult.message);
    } else {
      return Result.ok<CaminhoDistanciaArmazens>(new CaminhoDistanciaArmazens({ value: caminhoDistanciaArmazens }))
    }
  }
}