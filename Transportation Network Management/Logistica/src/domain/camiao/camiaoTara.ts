import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoTaraProps {
  value: number;
}

export class CamiaoTara extends ValueObject<CamiaoTaraProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoTaraProps) {
    super(props);
  }

  public static create (tara: number): Result<CamiaoTara> {
    if(tara <=0){
      return Result.fail<CamiaoTara>("Tara tem de ser superior a zero!");
    }
    const guardResult = Guard.againstNullOrUndefined(tara, 'tara');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoTara>(guardResult.message);
    } else {
      return Result.ok<CamiaoTara>(new CamiaoTara({ value: tara }))
    }
  }
}