
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaminhoTempoDeslocacaoMinProps {
  value: number;
}

export class CaminhoTempoDeslocacaoMin extends ValueObject<CaminhoTempoDeslocacaoMinProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CaminhoTempoDeslocacaoMinProps) {
    super(props);
  }

  public static create (caminhoTempoDeslocacaoMin: number): Result<CaminhoTempoDeslocacaoMin> {
    const guardResult = Guard.againstNullOrUndefined(caminhoTempoDeslocacaoMin, 'caminhoTempoDeslocacaoMin');
    if (!guardResult.succeeded || caminhoTempoDeslocacaoMin < 0) {
      return Result.fail<CaminhoTempoDeslocacaoMin>(guardResult.message);
    } else {
      return Result.ok<CaminhoTempoDeslocacaoMin>(new CaminhoTempoDeslocacaoMin({ value: caminhoTempoDeslocacaoMin }))
    }
  }
}