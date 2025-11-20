
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoTempoRecarregamentoProps {
  value: number;
}

export class CamiaoTempoRecarregamento extends ValueObject<CamiaoTempoRecarregamentoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoTempoRecarregamentoProps) {
    super(props);
  }

  public static create (tempoRecarregamento: number): Result< CamiaoTempoRecarregamento> {
    if(tempoRecarregamento <=0){
      return Result.fail<CamiaoTempoRecarregamento>("Tempo de Recarregamento tem de ser superior a zero!");
    }
    const guardResult = Guard.againstNullOrUndefined(tempoRecarregamento, 'tempoRecarregamento');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoTempoRecarregamento>(guardResult.message);
    } else {
      return Result.ok<CamiaoTempoRecarregamento>(new CamiaoTempoRecarregamento({ value: tempoRecarregamento }))
    }
  }
}