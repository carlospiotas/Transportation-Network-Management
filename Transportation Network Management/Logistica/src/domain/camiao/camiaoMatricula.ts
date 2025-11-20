import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoMatriculaProps {
  value: string;
}

export class CamiaoMatricula extends ValueObject<CamiaoMatriculaProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: CamiaoMatriculaProps) {
    super(props);
  }

  public static create (matricula: string): Result<CamiaoMatricula> {
    var reg = /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/;
    
    if(!reg.test(matricula)){
      return Result.fail<CamiaoMatricula>("Matricula com formato Inválido");
    }   
    const guardResult = Guard.againstNullOrUndefined(matricula, 'matricula');
    if (!guardResult.succeeded) {
      return Result.fail<CamiaoMatricula>(guardResult.message);
    } else {
      return Result.ok<CamiaoMatricula>(new CamiaoMatricula({ value: matricula }))
    }
  }
}