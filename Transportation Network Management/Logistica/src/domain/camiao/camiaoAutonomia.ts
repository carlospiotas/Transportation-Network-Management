
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoAutonomiaProps {
  value: number;
}

export class CamiaoAutonomia extends ValueObject<CamiaoAutonomiaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoAutonomiaProps) {
    super(props);
  }

  public static create (autonomia: number): Result<CamiaoAutonomia> {
    if(autonomia <=0){
      return Result.fail<CamiaoAutonomia>("Autonomia tem de ser superior a zero!");
    }
    const guardResult = Guard.againstNullOrUndefined(autonomia, 'autonomia');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoAutonomia>(guardResult.message);
    } else {
      return Result.ok<CamiaoAutonomia>(new CamiaoAutonomia({ value: autonomia }))
    }
  }
}