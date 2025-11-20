
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CaminhoEnergiaNecessariaKWhProps {
  value: number;
}

export class CaminhoEnergiaNecessariaKWh extends ValueObject<CaminhoEnergiaNecessariaKWhProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: CaminhoEnergiaNecessariaKWhProps) {
    super(props);
  }

  public static create(caminhoEnergiaNecessariaKWh: number): Result<CaminhoEnergiaNecessariaKWh> {
    const guardResult = Guard.againstNullOrUndefined(caminhoEnergiaNecessariaKWh, 'caminhoEnergiaNecessariaKWh');
    if (!guardResult.succeeded || caminhoEnergiaNecessariaKWh < 0) {
      return Result.fail<CaminhoEnergiaNecessariaKWh>(guardResult.message);
    } else {
      return Result.ok<CaminhoEnergiaNecessariaKWh>(new CaminhoEnergiaNecessariaKWh({ value: caminhoEnergiaNecessariaKWh }))
    }
  }
}